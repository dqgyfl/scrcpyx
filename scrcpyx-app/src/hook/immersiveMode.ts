import * as NavigationBar from "expo-navigation-bar";
import * as StatusBar from "expo-status-bar";
import {useEffect} from "react";

export function useImmersiveMode() {
    useEffect(() => {
        StatusBar.setStatusBarHidden(true)
        NavigationBar.setVisibilityAsync("hidden")
        return () => {
            StatusBar.setStatusBarHidden(false)
            NavigationBar.setVisibilityAsync("visible")
        }

    }, []);
}
