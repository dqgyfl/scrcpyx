import { YStack, XStack, Text, Button, XGroup, Card, SizableText } from 'tamagui'
import { useAppStore } from './AppStore'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
    useSharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated'
import { Dimensions } from "react-native";
import React from 'react';
import { Activity, Airplay, Fullscreen, Home, Menu, Minimize, StepBack, X as CloseIcon } from '@tamagui/lucide-icons';
import { useWindowManager } from "@/pages/scrcpyx/WindowManager";

function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
}

export default function Window({ window }: { window: any }) {
    const { apps } = useAppStore()
    const { closeWindow, toggleFullscreen, toggleMinimize } = useWindowManager()
    const app = apps.find((a) => a.id === window.appId)
    if (!app || window.minimized) return null

    const translationX = useSharedValue(0);
    const translationY = useSharedValue(0);
    const prevTranslationX = useSharedValue(0);
    const prevTranslationY = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [
            { translateX: translationX.value },
            { translateY: translationY.value },
        ],
    }));
    const { width, height } = Dimensions.get('screen');
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
            icon: StepBack,
            tooltip: "Back"
        },
        {
            icon: Home,
            tooltip: "Home"
        },
        {
            icon: Menu,
            tooltip: "Menu"
        },
        {
            icon: Minimize,
            onPress: () => toggleMinimize(window.id),
            tooltip: "Minimize"
        },
        {
            icon: Fullscreen,
            onPress: () => toggleFullscreen(window.id),
            tooltip: "Fullscreen"
        }
    ]

    return (
        <Animated.View
            style={[
                {
                    position: 'absolute',
                    width: window.width,
                    height: window.height,
                    backgroundColor: 'transparent',
                    zIndex: window.zIndex,
                },
                animatedStyles,
            ]}
        >
            <Card
                width="100%"
                height="100%"
                borderRadius="$6"
                shadowColor="rgba(0, 0, 0, 0.15)"
                shadowOffset={{ width: 0, height: 8 }}
                shadowOpacity={1}
                shadowRadius={16}
                elevation={8}
                backgroundColor="#ffffff"
            >
                <Card.Header
                    size="$0"
                    backgroundColor="linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)"
                    borderTopLeftRadius="$6"
                    borderTopRightRadius="$6"
                    borderBottomWidth={1}
                    borderBottomColor="#e2e8f0"
                    paddingVertical={0}
                >
                    <GestureDetector gesture={pan}>
                        <XStack
                            height={52}
                            alignItems="center"
                            paddingHorizontal={16}
                            cursor="move"
                            gap={12}
                        >
                            <XStack alignItems="center" gap={10} flex={1}>
                                {app.icon && (
                                    <Text fontSize={24}>{app.icon}</Text>
                                )}
                                <Text
                                    fontWeight="600"
                                    fontSize={15}
                                    color="#1e293b"
                                    letterSpacing={-0.2}
                                >
                                    {app.name}
                                </Text>
                            </XStack>
                            <XStack gap={4} alignItems="center">
                                {actions.map((a, index) => (
                                    <Button
                                        key={index}
                                        size="$2"
                                        icon={a.icon}
                                        onPress={a.onPress}
                                        variant="ghost"
                                        color="#64748b"
                                        hoverStyle={{ 
                                            backgroundColor: "#e2e8f0",
                                            borderRadius: "$3",
                                            transition: "all 0.2s ease"
                                        }}
                                        pressStyle={{ 
                                            backgroundColor: "#cbd5e1",
                                            borderRadius: "$3"
                                        }}
                                        borderRadius="$3"
                                        iconSize={18}
                                    />
                                ))}
                                <Button
                                    size="$2"
                                    onPress={() => closeWindow(app.id)}
                                    variant="ghost"
                                    icon={CloseIcon}
                                    color="#ef4444"
                                    hoverStyle={{ 
                                        backgroundColor: "#fee2e2",
                                        borderRadius: "$3",
                                        transition: "all 0.2s ease"
                                    }}
                                    pressStyle={{ 
                                        backgroundColor: "#fecaca",
                                        borderRadius: "$3"
                                    }}
                                    borderRadius="$3"
                                    iconSize={18}
                                />
                            </XStack>
                        </XStack>
                    </GestureDetector>
                </Card.Header>

                <YStack
                    alignItems="center"
                    justifyContent="center"
                    gap={20}
                    padding={24}
                    flex={1}
                    backgroundColor="linear-gradient(135deg, #1e293b 0%, #0f172a 100%)"
                    borderBottomLeftRadius="$0"
                    borderBottomRightRadius="$0"
                >
                    <YStack
                        alignItems="center"
                        justifyContent="center"
                        gap={12}
                        padding={32}
                        borderRadius="$4"
                        backgroundColor="rgba(255, 255, 255, 0.05)"
                        borderWidth={1}
                        borderColor="rgba(255, 255, 255, 0.1)"
                    >
                        <Text 
                            color="#f1f5f9" 
                            fontSize={28} 
                            fontWeight="600"
                            letterSpacing={-0.5}
                        >
                            [Mock scrcpy view]
                        </Text>
                        <Text 
                            color="#94a3b8" 
                            fontSize={15}
                            fontWeight="500"
                        >
                            {app.name} - {app.device}
                        </Text>
                    </YStack>
                </YStack>

                <Card.Footer
                    backgroundColor="linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)"
                    borderBottomLeftRadius="$6"
                    borderBottomRightRadius="$6"
                    borderTopWidth={1}
                    borderTopColor="#e2e8f0"
                    padding={12}
                >
                    <XStack
                        justifyContent="space-between"
                        alignItems="center"
                        width="100%"
                    >
                        <XStack gap={8} alignItems="center">
                            <Activity size={16} color="#64748b" />
                            <Text 
                                fontSize={13} 
                                color="#475569"
                                fontWeight="500"
                            >
                                Connected
                            </Text>
                        </XStack>
                        <XStack gap={16} alignItems="center">
                            <Text 
                                fontSize={13} 
                                color="#64748b"
                                fontWeight="500"
                            >
                                Resolution: 1920x1080
                            </Text>
                            <Text 
                                fontSize={13} 
                                color="#64748b"
                                fontWeight="500"
                            >
                                FPS: 60
                            </Text>
                        </XStack>
                    </XStack>
                </Card.Footer>
            </Card>
        </Animated.View>
    )
}
