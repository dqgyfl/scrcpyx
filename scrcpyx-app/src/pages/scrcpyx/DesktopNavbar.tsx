import {Input, Text, View, XStack} from 'tamagui'
import AddAppModal from "@/pages/scrcpyx/AddAppModal";
import SettingsModal from "@/pages/scrcpyx/SettingsModal";
import {useAppStore} from "@/pages/scrcpyx/AppStore";

export default function DesktopNavbar({}) {
    const {searchQuery, setSearchQuery} = useAppStore();
    
    return (
        <XStack 
            height={60} 
            backgroundColor="#ffffff" 
            shadowColor="rgba(0,0,0,0.1)" 
            shadowOffset={{width: 0, height: 2}} 
            shadowOpacity={0.8} 
            shadowRadius={4}
            elevation={2}
            alignItems="center"
            justifyContent="space-between"
            paddingHorizontal={20}
        >
            <Text 
                fontWeight="bold" 
                fontSize={20} 
                color="#333333"
            >
                ScrcpyX
            </Text>
            <View 
                flex={1} 
                maxWidth={400} 
                marginHorizontal={20}
            >
                <Input
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search apps..."
                    borderRadius="$4"
                    backgroundColor="#f0f0f0"
                    borderWidth={0}
                    paddingHorizontal={16}
                    fontSize={14}
                    hoverStyle={{backgroundColor: "#e0e0e0"}}
                />
            </View>
            <XStack gap={10}>
                <AddAppModal/>
                <SettingsModal/>
            </XStack>
        </XStack>
    )
}
