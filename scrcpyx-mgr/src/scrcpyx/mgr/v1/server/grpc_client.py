import asyncio

from scrcpyx.mgr.v1.mgr_pb2 import *
from scrcpyx.mgr.v1.mgr_pb2_grpc import *


async def list_devices(stub: ScrcpyxMgrServiceStub):
    print(await stub.ListDevices(ListDevicesRequest()))


async def list_apps(stub: ScrcpyxMgrServiceStub):
    print(await stub.ListApps(ListAppsRequest(did="127.0.0.1:16864")))


async def start_scrcpy_server(stub: ScrcpyxMgrServiceStub):
    response = await stub.StartScrcpyServer(
        StartScrcpyServerRequest(did="127.0.0.1:16864", args=[
            "tunnel_forward=true",
            "send_dummy_byte=false",
            "video_codec=h264",
            "audio_codec=aac",
            "clipboard_autosync=false",
        ])
    )
    print("Greeter received:", response.session_id)


async def run():
    async with grpc.aio.insecure_channel("localhost:50051") as channel:
        stub = ScrcpyxMgrServiceStub(channel)
        # await start_scrcpy_server(stub)
        await list_apps(stub)
        # await list_devices(stub)


if __name__ == "__main__":
    asyncio.run(run())
