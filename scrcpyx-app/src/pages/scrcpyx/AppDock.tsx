import {XStack, Button, Text, Tooltip} from "tamagui";
import {useAppStore} from "@/pages/scrcpyx/AppStore";
import {useWindowStore} from "@/pages/scrcpyx/WindowStore";

export default function AppDock() {
    const {pinnedApps, togglePinApp, apps} = useAppStore();
    const {windows, openApp, focusWindow, toggleMinimize} = useWindowStore();
    
    // Get unique opened app IDs
    const openedAppIds = Object.keys(windows);
    
    // Get opened app objects
    const openedApps = openedAppIds.map(appId => {
        return apps.find(app => app.id === appId);
    }).filter(Boolean);
    
    // Get pinned apps
    const pinned = pinnedApps();
    
    // Handler for app click
    const handleAppClick = (appId: string) => {
        const window = windows[appId];
        if (window) {
            if (window.minimized) {
                toggleMinimize(appId);
            }
            focusWindow(appId);
        } else {
            openApp(appId);
        }
    };
    
    // Handler for app right-click (pin/unpin)
    const handleAppRightClick = (e: React.MouseEvent, appId: string) => {
        e.preventDefault();
        togglePinApp(appId);
    };
    
    return (
        <XStack 
            position="absolute"
            bottom="20px"
            left="50%"
            transform="translateX(-50%)"
            height="80px"
            width="800px"
            bg="rgba(255, 255, 255, 0.9)"
            borderRadius="40px"
            padding="12px"
            justifyContent="center"
            alignItems="center"
            gap="12px"
            shadowColor="rgba(0, 0, 0, 0.3)"
            shadowOffset={{width: 0, height: -3}}
            shadowOpacity={0.3}
            shadowRadius={6}
            elevation={8}
        >
            {/* Pinned Apps */}
            {pinned.map(app => (
                <Tooltip key={`pinned-${app.id}`} content={app.name} side="top">
                    <Button
                        width="56px"
                        height="56px"
                        borderRadius="28px"
                        onPress={() => handleAppClick(app.id)}
                        onContextMenu={(e) => handleAppRightClick(e, app.id)}
                        bg={openedAppIds.includes(app.id) ? "rgba(230, 230, 230, 0.8)" : "transparent"}
                        borderWidth={openedAppIds.includes(app.id) ? 2 : 0}
                        borderColor="#007aff"
                    >
                        {app.icon ? <Text fontSize="24px">{app.icon}</Text> : <Text fontSize="20px">{app.name[0]}</Text>}
                    </Button>
                </Tooltip>
            ))}
            
            {/* Separator between pinned and opened apps */}
            {pinned.length > 0 && openedApps.length > 0 && (
                <XStack 
                    width="1px" 
                    height="40px" 
                    bg="rgba(0, 0, 0, 0.2)" 
                    marginHorizontal="8px"
                />
            )}
            
            {/* Opened Apps (not pinned) */}
            {openedApps
                .filter(app => !pinned.some(p => p.id === app.id))
                .map(app => (
                    <Tooltip key={`opened-${app.id}`} content={app.name} side="top">
                        <Button
                            width="56px"
                            height="56px"
                            borderRadius="28px"
                            onPress={() => handleAppClick(app.id)}
                            onContextMenu={(e) => handleAppRightClick(e, app.id)}
                            bg="rgba(230, 230, 230, 0.8)"
                            borderWidth={2}
                            borderColor="#007aff"
                        >
                            {app.icon ? <Text fontSize="24px">{app.icon}</Text> : <Text fontSize="20px">{app.name[0]}</Text>}
                        </Button>
                    </Tooltip>
                ))
            }
        </XStack>
    );
}