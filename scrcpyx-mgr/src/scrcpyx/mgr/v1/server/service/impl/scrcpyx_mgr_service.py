import asyncio
import random
import string

from typing_extensions import override

from scrcpyx.mgr.v1.mgr_pb2 import *
from scrcpyx.mgr.v1.mgr_pb2_grpc import *
from scrcpyx.mgr.v1.server.adb_client import run_adb, run_adb_async
from scrcpyx.mgr.v1.server.service.impl.scrcpyx_mgr_route_service import set_route

ADB_CMD_CONNECT = ["connect"]
ADB_CMD_PUSH_SCRCPY_SERVER = ["push", "scrcpy-server", "/data/local/tmp/scrcpy-server.jar"]
ADB_CMD_FORWARD_PORT = ["forward", "tcp:27183", "localabstract:scrcpy"]
ADB_CMD_RUN_SCRCPY_SERVER = [
    "shell", "CLASSPATH=/data/local/tmp/scrcpy-server.jar", "app_process", "/",
    "com.genymobile.scrcpy.Server", "3.3.3"
]


def random_domain(length=8, tld="com"):
    name = ''.join(random.choices(string.ascii_lowercase, k=length))
    return f"{name}.{tld}"


class ScrcpyxMgrServiceServicerImpl(ScrcpyxMgrServiceServicer):

    @override
    async def StartScrcpyServer(self, request: StartScrcpyServerRequest, context: grpc.RpcContext):
        opts = [
            "-s", request.did
        ]

        port = random.randint(10000, 20000)
        cmds = [
            ADB_CMD_CONNECT + [request.did],
            opts + ADB_CMD_PUSH_SCRCPY_SERVER,
            opts + ["forward", f"tcp:{port}", "localabstract:scrcpy"],
            opts + ADB_CMD_RUN_SCRCPY_SERVER + list(request.args),
        ]

        for cmd in cmds[:-1]:
            await run_adb_async(cmd)
        asyncio.create_task(run_adb_async(cmds[-1]))

        session_id = random_domain(8, "scid.scrcpyx")
        await set_route(session_id, ("127.0.0.1", port))
        return StartScrcpyServerResponse(session_id=session_id)

    @staticmethod
    def register(server: grpc.Server):
        add_ScrcpyxMgrServiceServicer_to_server(ScrcpyxMgrServiceServicerImpl(), server)
