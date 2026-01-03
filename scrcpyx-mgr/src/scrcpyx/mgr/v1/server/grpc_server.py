import asyncio

import grpc

from scrcpyx.mgr.v1.server.service.impl.scrcpyx_mgr_service import ScrcpyxMgrServiceServicerImpl


async def serve():
    server = grpc.aio.server()
    ScrcpyxMgrServiceServicerImpl.register(server)
    server.add_insecure_port("0.0.0.0:50052")
    await server.start()

    print("gRPC aio server started on :50052")
    await server.wait_for_termination()


if __name__ == "__main__":
    asyncio.run(serve())
