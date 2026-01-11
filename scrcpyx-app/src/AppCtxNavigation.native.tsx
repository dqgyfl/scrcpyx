import {useTheme} from "tamagui";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import * as React from "react";

function TamaguiNavigationWrapper({children}) {
    const theme = useTheme()
    // console.log(Object.keys(tamaguiConfig.themes))

    const naviRefTheme = {
        dark: false,
        colors: {
            primary: 'rgb(0, 122, 255)',
            background: 'rgb(242, 242, 242)',
            card: 'rgb(255, 255, 255)',
            text: 'rgb(28, 28, 30)',
            border: 'rgb(216, 216, 216)',
            notification: 'rgb(255, 59, 48)',
        },
    };
    const naviTheme = {
        ...DefaultTheme,
        colors: {
            primary: theme.color.get(),
            background: theme.background.get(),
            card: theme.shadowColor.get(),
            text: theme.color.get(),
            border: theme.borderColor.get(),
            notification: theme.shadowColor.get(),
        },
    };
    // return <NavigationContainer theme={naviTheme}>
    return <NavigationContainer theme={naviTheme}>
        {children}
    </NavigationContainer>
}

export default TamaguiNavigationWrapper;
