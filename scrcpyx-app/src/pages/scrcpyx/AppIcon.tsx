// src/components/AppIcon.tsx
import {Button, Card, Image, Text} from 'tamagui'
import {AppConfig} from './AppStore'
import {useWindowManager} from "@/pages/scrcpyx/WindowManager";

export default function AppIcon({app}: { app: AppConfig }) {
    const wm = useWindowManager()
    return (
        <Card>
            <Button width="$8" height="$8" onPress={() => wm.openApp(app.id)}>
                {app.icon ? <Image src={app.icon} width={64} height={64}/> : <Text color="#fff">{app.name[0]}</Text>}
            </Button>
            <Card.Footer justifyContent="center" alignItems="center" >
                <Text textAlign="center" width="$8" numberOfLines={1} ellipsizeMode="head">{app.name}</Text>
            </Card.Footer>
        </Card>
    )
}
