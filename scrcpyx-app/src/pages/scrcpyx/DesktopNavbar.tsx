import {Input, Text, View} from 'tamagui'
import AddAppModal from "@/pages/scrcpyx/AddAppModal";
import {Grid} from "./Grid";

export default function DesktopNavbar({}) {
    return (
        <Grid.Row height="$5">
            <Grid.Col span={4}>
                <Text fontWeight="bold" fontSize={18}>ScrcpyX</Text>
            </Grid.Col>
            <Grid.Col span={16}>
                <View/>
                {/*<Input*/}
                {/*    placeholder="Search apps..."*/}
                {/*/>*/}
            </Grid.Col>
            <Grid.Col span={4}>
                <AddAppModal/>
            </Grid.Col>
        </Grid.Row>
    )
}
