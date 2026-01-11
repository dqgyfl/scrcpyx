import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import * as React from "react";
import {useTheme} from "tamagui";

function TamaguiNavigationWrapper({children}) {
    const theme = useTheme()
    const naviTheme = {
        ...DefaultTheme,
        colors: {
            primary: theme.color.val,
            background: theme.background.val,
            card: theme.shadowColor.val,
            text: theme.color.val,
            border: theme.borderColor.val,
            notification: theme.shadowColor.val,
        },
    };
    return <NavigationContainer theme={naviTheme}>
        {children}
    </NavigationContainer>
}

export default TamaguiNavigationWrapper;

