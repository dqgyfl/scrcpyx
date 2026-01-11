import * as React from 'react';
import {Suspense} from 'react';
import {PortalProvider, TamaguiProvider, Theme} from "tamagui"
import {polyfills} from "@/utils/grpc/hack/polyfills";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useImmersiveMode} from "@/hook/immersiveMode";
import LoadingView from "@/components/LoadingView";
import tamaguiConfig from './tamagui.config'
import TamaguiNavigationWrapper from './AppCtxNavigation'

polyfills()


const queryClient = new QueryClient()


function TamaguiWrapper({children}) {
    return <TamaguiProvider config={tamaguiConfig} defaultTheme={"light_green"}>
        <Theme>
            <PortalProvider>
                <Suspense fallback={<LoadingView/>}>
                    <QueryClientProvider client={queryClient}>
                        <TamaguiNavigationWrapper>{children}</TamaguiNavigationWrapper>
                    </QueryClientProvider>
                </Suspense>
            </PortalProvider>
        </Theme>
    </TamaguiProvider>
}

export default function AppCtx({children}) {
    useImmersiveMode()
    return (
        <>
            <TamaguiWrapper>{children}</TamaguiWrapper>
        </>
    );
}
