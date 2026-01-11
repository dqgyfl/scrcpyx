import {useWindowStore} from "@/pages/scrcpyx/WindowStore";
import Window from "./Window"
import {Dialog} from "tamagui";

// Hook for easy access
export const useWindowManager = () => {
    return useWindowStore()
}

const WindowManager = (props) => {
    const {windows} = useWindowStore()

    return (
        <>
            {Object.values(windows).map((w) =>
                <Dialog modal={false}>
                    <Window key={w.appId} window={w}/>
                </Dialog>
            )}
        </>
    )
}

export default WindowManager
