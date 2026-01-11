import {useAppStore} from "@/pages/scrcpyx/AppStore";
import {ScrollView, XStack, YStack} from "tamagui";
import AppIcon from "@/pages/scrcpyx/AppIcon";

export default function AppGrid() {
    const {apps} = useAppStore()
    return (
        <YStack flex={1}>
            <ScrollView>
                <XStack flexWrap="wrap" gap={20}>
                    {apps.map((app) => (
                        <AppIcon key={app.id} app={app}/>
                    ))}
                </XStack>
            </ScrollView>
        </YStack>
    )
}
