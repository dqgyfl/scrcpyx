import {Button, Dialog} from 'tamagui'
import {useAppStore} from './AppStore'
import {FormOption} from "@/pages/scrcpyx/XFormField";
import React, {useState} from "react";
import {DynamicForm} from "@/pages/scrcpyx/XFrom";
import {Plus} from "@tamagui/lucide-icons";

export default function AddAppModal() {
    const {addApp} = useAppStore()

    const option: FormOption = {
        column: [
            {prop: 'id', label: 'id', type: 'input',},
            {prop: 'name', label: 'name', type: 'input',},
            {
                prop: 'device', label: 'device', type: 'select',
                options: [
                    {
                        value: "com.test.sss",
                        label: "App",
                    }
                ]
            },
            {
                prop: 'app', label: 'app', type: 'select',
                options: [
                    {
                        value: "aaaa",
                        label: "boooo",
                    }
                ]
            },
        ],
    }

    const [model, setModel] = useState({})

    return <Dialog modal>
        <Dialog.Trigger asChild>
            <Button icon={Plus}/>
        </Dialog.Trigger>
        <Dialog.Portal>
            <Dialog.Content>
                <DynamicForm
                    option={option}
                    model={model}
                    onChange={setModel}
                    onSave={addApp}
                />
                <Button
                    onPress={() => {
                        addApp(model)
                        return false
                    }}
                >
                    Save
                </Button>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog>
}