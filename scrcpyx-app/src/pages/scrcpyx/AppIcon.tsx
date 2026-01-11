// src/components/AppIcon.tsx
import {Button, Card, Image, Text} from 'tamagui'
import {AppConfig} from './AppStore'
import {useWindowManager} from "@/pages/scrcpyx/WindowManager";

export default function AppIcon({app}: { app: AppConfig }) {
    const wm = useWindowManager()
    return (
        <Card>
            <Button width="$8" height="$8" onPress={() => wm.openApp(app.id)}>
                {app.icon ? <Text fontSize="$7">{app.icon}</Text> : <Text color="#fff">{app.name[0]}</Text>}
            </Button>
            <Card.Footer justifyContent="center" alignItems="center" padding="$2 0">
                <Text textAlign="center" width="$8" numberOfLines={1} ellipsizeMode="tail" fontSize="$2">{app.name}</Text>
            </Card.Footer>
        </Card>
    )
}
