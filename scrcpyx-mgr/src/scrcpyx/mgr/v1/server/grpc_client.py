import asyncio
import grpc

from scrcpyx.mgr.v1.mgr_pb2 import *
from scrcpyx.mgr.v1.mgr_pb2_grpc import *


async def run():
    async with grpc.aio.insecure_channel("localhost:50051") as channel:
        stub = ScrcpyxMgrServiceStub(channel)

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


if __name__ == "__main__":
    asyncio.run(run())
