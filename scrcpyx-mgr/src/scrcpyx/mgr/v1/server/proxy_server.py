from __future__ import annotations

import asyncio
import ssl
from typing import Optional

from scrcpyx.mgr.v1.server.service.impl.scrcpyx_mgr_route_service import Backend, get_route

# ----------------------------
# Configuration
# ----------------------------
# ROUTES: Dict[str, Backend] = {
#     "did.dev.com": ("127.0.0.1", 27183),
#     "api.example.com": ("gf.dev.sai", 80),
# }
DEFAULT_BACKEND: Backend = ("127.0.0.1", 443)

SERVER_CERT = "pki/tls.crt"
SERVER_KEY = "pki/tls.key"
CA_CERT = "pki/ca.crt"

LISTEN_HOST = "0.0.0.0"
LISTEN_PORT = 4430


# ----------------------------
# SSL Context
# ----------------------------
def create_ssl_context() -> ssl.SSLContext:
    ctx = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
    ctx.load_cert_chain(certfile=SERVER_CERT, keyfile=SERVER_KEY)
    ctx.verify_mode = ssl.CERT_OPTIONAL
    ctx.load_verify_locations(CA_CERT)
    ctx.sni_callback = sni_callback
    return ctx


# ----------------------------
# SNI callback
# ----------------------------
def sni_callback(ssl_sock: ssl.SSLSocket, server_name: Optional[str], ssl_ctx: ssl.SSLContext) -> None:
    if server_name is None:
        ssl_sock.sni_backend = ""
        return
    ssl_sock.sni_backend = server_name


# ----------------------------
# Bidirectional TCP relay
# ----------------------------
async def relay(src: asyncio.StreamReader, dst: asyncio.StreamWriter) -> None:
    try:
        while True:
            data = await src.read(8192)
            if not data:
                break
            dst.write(data)
            await dst.drain()
    except Exception as e:
        print(f"[WARN] Relay error: {e}")
    finally:
        dst.close()


# ----------------------------
# Handle client connection
# ----------------------------
async def handle_client(reader: asyncio.StreamReader, writer: asyncio.StreamWriter) -> None:
    ssl_sock = writer.get_extra_info("ssl_object")  # type: ignore
    sni: str = getattr(ssl_sock, "sni_backend", "")
    backend = await get_route(sni)
    if backend is None:
        backend = DEFAULT_BACKEND

    print(f"[INFO] Client SNI: {sni}, routing to {backend}")

    # Extract client certificate info
    cert = ssl_sock.getpeercert()
    print(f"[INFO] Client certificate: {cert}")

    # Connect to backend
    backend_reader, backend_writer = await asyncio.open_connection(*backend)

    # Relay data both ways
    await asyncio.gather(
        relay(reader, backend_writer),
        relay(backend_reader, writer),
    )


# ----------------------------
# Main entry
# ----------------------------
async def main() -> None:
    ssl_ctx = create_ssl_context()
    server = await asyncio.start_server(
        handle_client,
        host=LISTEN_HOST,
        port=LISTEN_PORT,
        ssl=ssl_ctx,
    )
    print(f"[INFO] mTLS SNI forwarder running on {LISTEN_HOST}:{LISTEN_PORT}")
    async with server:
        await server.serve_forever()


if __name__ == "__main__":
    asyncio.run(main())
