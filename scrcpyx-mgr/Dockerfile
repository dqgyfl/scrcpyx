FROM python:3.13-slim AS builder

RUN pip install uv

WORKDIR /tmp

COPY pyproject.toml ./
COPY uv.toml ./
RUN uv sync --no-managed-python

COPY src/ ./src/
RUN uv run python -m PyInstaller --paths src --onefile src/scrcpyx/mgr/v1/server/main.py

FROM python:3.13-slim

WORKDIR /app

COPY pki/ pki/
COPY --from=builder /tmp/dist/main main

ENTRYPOINT ["/app/main"]
