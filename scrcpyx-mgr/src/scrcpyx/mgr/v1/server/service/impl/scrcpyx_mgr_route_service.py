from aiocache import Cache
from typing import Tuple

Backend = Tuple[str, int]

# async in-memory store with TTL
routes = Cache(
    Cache.MEMORY,
    ttl=300  # 5 minutes
)

sessions = Cache(
    Cache.MEMORY,
)

DEFAULT_BACKEND: Backend = ("127.0.0.1", 50052)


async def set_route(host: str, backend: Backend):
    await routes.set(host, backend, ttl=300)


async def get_route(host: str) -> Backend:
    return await routes.get(host, default=DEFAULT_BACKEND)


async def delete_route(host: str):
    await routes.delete(host)


async def get_session(host: str):
    return await sessions.get(host)


async def set_session(host: str, session):
    return await sessions.set(host, session)


async def delete_session(host: str):
    await sessions.delete(host)
