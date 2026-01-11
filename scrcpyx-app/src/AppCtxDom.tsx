import * as React from 'react';
import {useEffect, useRef} from 'react';

import AppCtx from "@/AppCtx";

import {useMediaLibrary} from "@/store/MediaLibraryStore";
import {useNavigation, useRoute} from "@react-navigation/core";
import {StackNavigationEventMap, StackNavigationOptions, StackView} from "@react-navigation/stack";
import {
    createNavigatorFactory,
    ParamListBase,
    StackActionHelpers,
    StackNavigationState,
    StackRouter,
    StackRouterOptions,
    useLocale,
    useNavigationBuilder
} from "@react-navigation/native";
import {useWindowDimensions} from "react-native";

export function useAppCtxDom(saveRoute = true) {
    // the ctx need pass to the dom component
    // but cannot directly pass props to a children
    // so using a hook, and let user pass ctx manually
    const {ml} = useMediaLibrary()
    const navigation = useNavigation()
    let route = null
    if (saveRoute) {
        route = useRoute()
    }

    function evtMux(cmd, ...args) {
        switch (cmd) {
            case "navigate":
                navigation.navigate(...args)
        }
        return {
            code: "ok"
        }
    }

    const ctx = {
        ml, evtMux, route: {
            params: route?.params
        }
    }
    return ctx
}

export function restoreAppCtxDom(ctx) {
    const {setMl} = useMediaLibrary()
    const state = useRef(null)
    useEffect(() => {
        if (JSON.stringify(state.current) == JSON.stringify(ctx.ml)) {
            return
        }
        console.log(state.current, ctx.ml)
        state.current = ctx.ml;
        setMl(ctx.ml)
    }, [ctx.ml]);
}

export default function AppCtxDom({children, ...ctx}: any) {
    const IS_DOM = typeof ReactNativeWebView !== 'undefined';
    if (!IS_DOM) {
        return <>{children}</>
    }

    restoreAppCtxDom(ctx)
    const {width, height} = useWindowDimensions()

    const Navi = createPassThoughNavigator({});

    return (
        <AppCtx>
            <Navi.Navigator ctx={ctx}>
                <Navi.Screen name="PassThoughRoot"
                             options={{
                                 headerShown: false,
                             }}
                             initialParams={ctx.route.params}
                >
                    {() => {
                        return <div style={{
                            width: width,
                            height: height,
                            // backgroundColor: "cyan"
                        }}>
                            {children}
                        </div>
                    }}
                </Navi.Screen>
            </Navi.Navigator>
        </AppCtx>
    );
}

const PassThoughRouter = ({ctx, ...options}) => {
    const router = StackRouter(options);

    return {
        ...router,
        getStateForAction(state, action, options) {
            ctx.evtMux("navigate", action.payload.name, action.payload.params)
            return state
        },
    };
};

function PassThoughNavigator({
                                 id,
                                 initialRouteName,
                                 children,
                                 layout,
                                 screenListeners,
                                 screenOptions,
                                 screenLayout,
                                 backBehavior,
                                 ctx,
                                 ...rest
                             }) {

    const {direction} = useLocale();

    const {state, describe, descriptors, navigation, NavigationContent} =
        useNavigationBuilder<
            StackNavigationState<ParamListBase>,
            StackRouterOptions,
            StackActionHelpers<ParamListBase>,
            StackNavigationOptions,
            StackNavigationEventMap
        >(PassThoughRouter, {
            id,
            initialRouteName,
            children,
            layout,
            screenListeners,
            screenOptions,
            screenLayout,
            ctx
        });
    return (
        <NavigationContent>
            <StackView
                {...rest}
                direction={direction}
                state={state}
                describe={describe}
                descriptors={descriptors}
                navigation={navigation}
            />
        </NavigationContent>
    );
}

function createPassThoughNavigator(config) {
    return createNavigatorFactory(PassThoughNavigator)(config);
}
