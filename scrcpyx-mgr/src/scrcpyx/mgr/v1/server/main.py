import asyncio

from grpc_server import serve as grpc_serve
from proxy_server import main as proxy_serve


async def main():
    done, pending = await asyncio.wait(
        {
            asyncio.create_task(grpc_serve()),
            asyncio.create_task(proxy_serve()),
        },
        return_when=asyncio.FIRST_COMPLETED,
    )

    # Get result of the first completed task
    first_result = list(done)[0].result()
    print("First completed:", first_result)

    # Optionally cancel the remaining tasks
    for p in pending:
        p.cancel()

    await asyncio.gather(*pending, return_exceptions=True)


if __name__ == "__main__":
    asyncio.run(main())
