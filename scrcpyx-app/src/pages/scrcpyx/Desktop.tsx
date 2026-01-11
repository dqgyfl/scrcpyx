import WindowManager from "@/pages/scrcpyx/WindowManager";
import AppGrid from "@/pages/scrcpyx/AppGrid";
import DesktopNavbar from "@/pages/scrcpyx/DesktopNavbar";
import AppDock from "@/pages/scrcpyx/AppDock";
import { GridExample } from "@/pages/scrcpyx/Grid";
import { YStack } from "tamagui";

export default function Desktop() {
    return (
        <YStack width="100%" height="100vh" bg="#f5f5f5" overflow="hidden">
            <DesktopNavbar />
            <AppGrid />
            <AppDock />
            <WindowManager />
        </YStack>
    )
}
