import asyncio
import random
import re
import string

from typing_extensions import override

from scrcpyx.mgr.v1.mgr_pb2 import *
from scrcpyx.mgr.v1.mgr_pb2_grpc import *
from scrcpyx.mgr.v1.server.adb_client import run_adb_async
from scrcpyx.mgr.v1.server.service.impl.scrcpyx_mgr_route_service import set_route, set_session, \
    get_session

ADB_CMD_PUSH_SCRCPY_SERVER = ["push", "scrcpy-server", "/data/local/tmp/scrcpy-server.jar"]
ADB_CMD_RUN_SCRCPY_SERVER = [
    "shell", "CLASSPATH=/data/local/tmp/scrcpy-server.jar", "app_process", "/",
    "com.genymobile.scrcpy.Server", "3.3.3"
]

APP_FILTER_MAP = {
    AppFilter.ENABLED: "-e",
    AppFilter.DISABLED: "-d",
    AppFilter.SYSTEM: "-s",
    AppFilter.THIRD_PARTY: "-3",
    AppFilter.APEX_ONLY: "--apex-only",
}

SIMPLE_PARSE_OPTIONS = {
    AppInfo: {
        "package:": "package_name",
        "uid:": "package_uid"
    },
    DeviceInfo: {
        0: "did",
        "product:": "product",
        "model:": "model",
        "device:": "device",
    }
}


def _simple_parse_list(lines, cls):
    res = []
    for line in lines:
        line = line.strip()
        if not line:
            continue
        obj = cls()
        parts = line.split()
        for k, v in SIMPLE_PARSE_OPTIONS[cls].items():
            if isinstance(k, int):
                setattr(obj, v, parts[k])
                continue
            for part in parts:
                if part.startswith(k):
                    setattr(obj, v, part[len(k):])
                    break
        res.append(obj)
    return res


def random_domain(length=8, tld="com"):
    name = ''.join(random.choices(string.ascii_lowercase, k=length))
    return f"{name}.{tld}"


def _validate_args(args):
    for arg in args:
        if re.search(r'[;&|><`$]', arg):
            raise ValueError("Forbidden shell characters in argument")


VALID_DID = re.compile(r'^[A-Za-z0-9._:-]+$')


def _validate_did(did):
    if not VALID_DID.match(did):
        raise ValueError(f"Invalid device ID: {did!r}")


class AdbSession:

    def __init__(self, session_id, open_cmds, close_cmds):
        self.session_id = session_id
        self.open_cmds = open_cmds
        self.close_cmds = close_cmds
        self.task = None

    async def open(self):
        print("open session", self.session_id)
        for cmd in self.open_cmds[:-1]:
            await run_adb_async(cmd)
        self.task = asyncio.create_task(run_adb_async(self.open_cmds[-1]))
        asyncio.create_task(self._clear_session())
        await set_session(self.session_id, self)

    async def close(self):
        print("close session", self.session_id)
        if self.task is not None:
            self.task.cancel()
        for cmd in self.close_cmds:
            await run_adb_async(cmd)

    async def _clear_session(self):
        await asyncio.sleep(300)
        session = await get_session(self.session_id)
        if session is None:
            return
        else:
            await self.close()


class ScrcpyxMgrServiceServicerImpl(ScrcpyxMgrServiceServicer):

    @override
    async def StartScrcpyServer(self, request: StartScrcpyServerRequest, context: grpc.aio.RpcContext):
        _validate_did(request.did)
        _validate_args(request.args)
        opts = [
            "-s", request.did
        ]
        port = random.randint(10000, 20000)
        if ":" in request.did:
            cmds = [["connect", request.did]]
        else:
            cmds = []
        cmds += [
            opts + ADB_CMD_PUSH_SCRCPY_SERVER,
            opts + ["reverse", "tcp:13081", "tcp:11808"],
            opts + ["forward", f"tcp:{port}", "localabstract:scrcpy"],
            # todo: shell injection in android?
            # todo: should start appreciate scrcpy server by request, eg 3 -> 3.3.3 or 2.2 -> 2.2.2
        ]
        clear_cmds = [
            opts + ["forward", "--remove", f"tcp:{port}"]
        ]

        if "nd=true" in request.args:
            request.args.remove("nd=true")
            new_display_arg_pattern = r'^new_display=(\d+)x(\d+)(?:/(\d+))?$'
            for arg in request.args:
                m = re.match(new_display_arg_pattern, arg)
                if not m:
                    continue
                width = int(m.group(1))
                height = int(m.group(2))
                dpi = int(m.group(3)) if m.group(3) else None
                cmds.append(opts + ["shell", "wm", "size", f"{width}x{height}"])
                if dpi is not None:
                    cmds.append(opts + ["shell", "wm", "density", f"{dpi}"])
                request.args.remove(arg)
                break

        cmds += [opts + ADB_CMD_RUN_SCRCPY_SERVER + list(request.args[1:])]

        session_id = random_domain(8, "scid.scrcpyx")
        session = AdbSession(session_id, cmds, clear_cmds)
        await session.open()
        await set_route(session_id, ("127.0.0.1", port))
        return StartScrcpyServerResponse(session_id=session_id)

    @override
    async def ListApps(self, request: ListAppsRequest, context: grpc.aio.RpcContext):
        _validate_did(request.did)
        cmd = ["-s", request.did, "shell", "pm", "list", "packages", "-U"]
        if len(request.filters) == 0:
            cmd.append("-3")
        for f in request.filters:
            if f in APP_FILTER_MAP:
                cmd.append(APP_FILTER_MAP[f])
        result = await run_adb_async(cmd, stream_output=False)
        return ListAppsResponse(
            apps=_simple_parse_list(result.stdout.splitlines(), AppInfo)
        )

    async def ListDevices(self, request: ListDevicesRequest, context):
        result = await run_adb_async(["devices", "-l"], stream_output=False)
        return ListDevicesResponse(
            devices=_simple_parse_list(result.stdout.splitlines()[1:], DeviceInfo)
        )

    @staticmethod
    def register(server: grpc.Server):
        add_ScrcpyxMgrServiceServicer_to_server(ScrcpyxMgrServiceServicerImpl(), server)
