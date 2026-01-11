import {Button, Dialog, Text, YStack} from 'tamagui'
import {useAppStore} from './AppStore'
import {FormOption} from "@/pages/scrcpyx/XFormField";
import React, {useState} from "react";
import {DynamicForm} from "@/pages/scrcpyx/XFrom";
import {Plus} from "@tamagui/lucide-icons";

export default function AddAppModal() {
    const {addApp} = useAppStore()

    const option: FormOption = {
        column: [
            {prop: 'id', label: 'App ID', type: 'input', required: true},
            {prop: 'name', label: 'App Name', type: 'input', required: true},
            {prop: 'icon', label: 'App Icon (emoji)', type: 'input'},
            {
                prop: 'device', 
                label: 'Package Name', 
                type: 'input',
                required: true
            },
            {
                prop: 'startApp', 
                label: 'Activity Name', 
                type: 'input',
                required: true
            },
        ],
    }

    const [model, setModel] = useState({})

    return <Dialog modal>
        <Dialog.Trigger asChild>
            <Button 
                icon={Plus} 
                borderRadius="$4" 
                backgroundColor="#4CAF50"
                color="white"
                hoverStyle={{backgroundColor: "#45a049"}}
                pressStyle={{backgroundColor: "#3d8b40"}}
                size="$4"
                transition="all 0.2s ease"
            />
        </Dialog.Trigger>
        <Dialog.Portal>
            <Dialog.Content 
                width={500} 
                borderRadius="$4"
                backgroundColor="#ffffff"
                padding={20}
            >
                <Dialog.Title 
                    fontSize={20} 
                    fontWeight="bold"
                    color="#333333"
                    marginBottom={20}
                >
                    Add New App
                </Dialog.Title>
                <DynamicForm
                    option={option}
                    model={model}
                    onChange={setModel}
                    onSave={addApp}
                />
                <YStack 
                    flexDirection="row" 
                    justifyContent="flex-end" 
                    marginTop={20} 
                    gap={10}
                >
                    <Dialog.Close asChild>
                        <Button 
                            variant="outline" 
                            borderRadius="$4"
                            size="$4"
                            transition="all 0.2s ease"
                        >
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Button
                        onPress={() => {
                            addApp(model)
                            return false
                        }}
                        borderRadius="$4"
                        backgroundColor="#4CAF50"
                        color="white"
                        hoverStyle={{backgroundColor: "#45a049"}}
                        pressStyle={{backgroundColor: "#3d8b40"}}
                        size="$4"
                        transition="all 0.2s ease"
                    >
                        Save App
                    </Button>
                </YStack>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog>
}