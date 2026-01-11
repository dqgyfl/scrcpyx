import {YStack, XStack, Text, Button, XGroup, Card, SizableText} from 'tamagui'
import {useAppStore} from './AppStore'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated'
import {Dimensions} from "react-native";
import React from 'react';
import {Activity, Airplay, Fullscreen, Home, Menu, StepBack} from '@tamagui/lucide-icons';
import {useWindowManager} from "@/pages/scrcpyx/WindowManager";

function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
}

export default function Window({window}: { window: any }) {
    const {apps} = useAppStore()
    const {closeWindow, toggleFullscreen} = useWindowManager()
    const app = apps.find((a) => a.id === window.appId)
    if (!app) return null


    const translationX = useSharedValue(0);
    const translationY = useSharedValue(0);
    const prevTranslationX = useSharedValue(0);
    const prevTranslationY = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [
            {translateX: translationX.value},
            {translateY: translationY.value},
        ],
    }));
    const {width, height} = Dimensions.get('screen');
    const pan = Gesture.Pan()
        .minDistance(1)
        .onStart(() => {
            prevTranslationX.value = translationX.value;
            prevTranslationY.value = translationY.value;
        })
        .onUpdate((event) => {
            const maxTranslateX = width / 2 - 50;
            const maxTranslateY = height / 2 - 50;

            translationX.value = clamp(
                prevTranslationX.value + event.translationX,
                -maxTranslateX,
                maxTranslateX
            );
            translationY.value = clamp(
                prevTranslationY.value + event.translationY,
                -maxTranslateY,
                maxTranslateY
            );
        });

    const actions = [
        {
            icon: StepBack
        },
        {
            icon: Home
        },
        {
            icon: Menu
        },
        {
            icon: Fullscreen,
            onPress: () => toggleFullscreen(window.id)
        }
    ]


    return (
        <Animated.View
            style={[
                {
                    position: 'absolute',
                    width: window.width,
                    height: window.height,
                    backgroundColor: 'green',
                },
                animatedStyles,
            ]}
        >
            <Card>
                <Card.Header size="$0">
                    <GestureDetector gesture={pan}>
                        <XStack height={40} alignItems="center" paddingHorizontal={10}>
                            <Text fontWeight="bold" flex={1}>
                                {app.name}
                            </Text>
                            {actions.map((a) => {
                                return (
                                    <Button size="$2" icon={a.icon} onPress={a.onPress}/>
                                )
                            })}
                            <Button size="$2" onPress={() => closeWindow(app.id)} color="#fff">
                                X
                            </Button>
                        </XStack>
                    </GestureDetector>
                </Card.Header>

                <YStack style={{backgroundColor: 'green'}}>
                    <Text color="#fff">[Mock scrcpy view]</Text>
                </YStack>
            </Card>
        </Animated.View>
    )
}
