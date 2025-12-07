GRPC_OUT_DIR=./src

mkdir -p $GRPC_OUT_DIR

python -m grpc_tools.protoc -I./scrcpyx-api/ --python_out=$GRPC_OUT_DIR --pyi_out=$GRPC_OUT_DIR --grpc_python_out=$GRPC_OUT_DIR --grpc_pyi_out=$GRPC_OUT_DIR ./scrcpyx-api/scrcpyx/mgr/v1/mgr.proto