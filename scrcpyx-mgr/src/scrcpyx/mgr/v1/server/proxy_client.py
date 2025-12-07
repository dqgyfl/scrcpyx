import asyncio
import ssl
from typing import Optional

SERVER_HOST = "127.0.0.1"
SERVER_PORT = 4430
SERVER_NAME = "api.example.com"  # SNI

CLIENT_CERT = "tls.crt"
CLIENT_KEY = "tls.key"
CA_CERT = "ca.crt"

async def fetch() -> None:
    ctx = ssl.create_default_context(ssl.Purpose.SERVER_AUTH, cafile=CA_CERT)
    ctx.verify_mode = ssl.CERT_OPTIONAL
    ctx.load_cert_chain(certfile=CLIENT_CERT, keyfile=CLIENT_KEY)
    ctx.check_hostname = False  # verify SNI matches server certificate

    reader, writer = await asyncio.open_connection(
        host=SERVER_HOST,
        port=SERVER_PORT,
        ssl=ctx,
        server_hostname=SERVER_NAME  # SNI
    )

    print(f"[INFO] Connected to {SERVER_NAME} via {SERVER_HOST}:{SERVER_PORT}")

    # Example: simple HTTP GET request
    request = f"GET / HTTP/1.1\r\nHost: {SERVER_NAME}\r\nConnection: close\r\n\r\n"
    writer.write(request.encode())
    await writer.drain()

    response = await reader.read(-1)
    print(response.decode(errors='ignore'))

    writer.close()
    await writer.wait_closed()

asyncio.run(fetch())
