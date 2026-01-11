import WindowManager from "@/pages/scrcpyx/WindowManager";
import AppGrid from "@/pages/scrcpyx/AppGrid";
import DesktopNavbar from "@/pages/scrcpyx/DesktopNavbar";
import {GridExample} from "@/pages/scrcpyx/Grid";
import {YStack} from "tamagui";

export default function Desktop() {
    return (
        <YStack width="100%">
            <DesktopNavbar />
            <AppGrid/>
            <WindowManager/>
        </YStack>
    )
}
