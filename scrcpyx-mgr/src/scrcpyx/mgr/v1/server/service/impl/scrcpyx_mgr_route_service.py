from aiocache import Cache
from typing import Tuple

Backend = Tuple[str, int]

# async in-memory store with TTL
routes = Cache(
    Cache.MEMORY,
    ttl=300   # 5 minutes
)

DEFAULT_BACKEND: Backend = ("127.0.0.1", 443)

async def set_route(host: str, backend: Backend):
    await routes.set(host, backend)

async def get_route(host: str) -> Backend:
    return await routes.get(host, default=DEFAULT_BACKEND)

async def delete_route(host: str):
    await routes.delete(host)
