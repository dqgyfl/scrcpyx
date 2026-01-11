import {useAppStore} from "@/pages/scrcpyx/AppStore";
import {ScrollView, XStack, YStack} from "tamagui";
import AppIcon from "@/pages/scrcpyx/AppIcon";

export default function AppGrid() {
    const {filteredApps} = useAppStore()
    const apps = filteredApps()
    return (
        <YStack flex={1} p={20} bg="#f5f5f5">
            <ScrollView showsVerticalScrollIndicator={false}>
                <XStack 
                    flexWrap="wrap" 
                    gap={24} 
                    justifyContent="center"
                    alignItems="center"
                    paddingVertical={20}
                >
                    {apps.map((app) => (
                        <AppIcon key={app.id} app={app}/>
                    ))}
                </XStack>
            </ScrollView>
        </YStack>
    )
}
