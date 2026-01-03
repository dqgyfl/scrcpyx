GRPC_OUT_DIR=./src

mkdir -p $GRPC_OUT_DIR

uv run python -m grpc_tools.protoc -I./proto/ --python_out=$GRPC_OUT_DIR --pyi_out=$GRPC_OUT_DIR --grpc_python_out=$GRPC_OUT_DIR ./proto/scrcpyx/mgr/v1/mgr.proto