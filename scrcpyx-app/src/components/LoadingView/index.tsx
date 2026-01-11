import {View} from "react-native";
import {Spinner} from "tamagui";

export default function LoadingView() {
    return <View style={{width: "100%", height: "100%", alignItems: "center", justifyContent: "center"}}>
        <Spinner/>
    </View>;
}
