import {YStack, Text} from "tamagui";
import {AppConfig} from "@/pages/scrcpyx/AppStore";

export default function DebugApp({app}: { app: AppConfig }) {
    return (
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
    )
}