// use-client.ts
import {ServiceType} from "@bufbuild/protobuf";
import {CallbackClient, createCallbackClient, createClient, PromiseClient} from "@connectrpc/connect";
import {createXHRGrpcWebTransport} from "./grpc/hack/grpc_web_transport";
import {polyfills} from "./grpc/hack/polyfills";
import {useMediaLibrary} from "../store/MediaLibraryStore";
import {useMemo} from "react";

polyfills();

export function useClient<T extends ServiceType>(service: T): PromiseClient<T> {
    // console.log("aaaa", service.typeName)
    const {ml: {srvUrl}} = useMediaLibrary()
    return useMemo(() => {
        const transport = createXHRGrpcWebTransport({
            baseUrl: srvUrl + "/grpc-web/grpc-reactor",
        });
        console.log("client", srvUrl)
        return createClient(service, transport);
    }, [service.typeName, srvUrl])
}

export function useCallbackClienct<T extends ServiceType>(service: T): CallbackClient<T> {
    const {ml: {srvUrl}} = useMediaLibrary()
    const transport = createXHRGrpcWebTransport({
        baseUrl: srvUrl + "/grpc-web/grpc-reactor",
    });
    return createCallbackClient(service, transport);
}
