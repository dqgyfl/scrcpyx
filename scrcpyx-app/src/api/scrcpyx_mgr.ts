import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useClient } from "@/utils/grpc";
import { ScrcpyxMgrService } from "@/gen/scrcpyx/mgr/v1/mgr_connect";

export function useScrcpyxService() {
    return useClient(ScrcpyxMgrService);
}

export function useListDevices() {
    const client = useScrcpyxService();
    return useQuery({
        queryKey: ["devices"],
        queryFn: () => client.listDevices({}),
    });
}

export function useListApps(did: string) {
    const client = useScrcpyxService();
    return useQuery({
        queryKey: ["apps", did],
        queryFn: () => client.listApps({ did }),
        enabled: !!did,
    });
}

export function useStartScrcpyServer() {
    const client = useScrcpyxService();
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (request: { did: string; args?: string[] }) => 
            client.startScrcpyServer(request),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["devices"] });
        },
    });
}