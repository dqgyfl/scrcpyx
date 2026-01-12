import {useState} from "react";
import {Button, Dialog, YStack} from "tamagui";
import {Settings} from "@tamagui/lucide-icons";
import {DynamicForm} from "./XForm";
import {useMediaLibrary} from "@/store/MediaLibraryStore";

interface SettingsFormModel {
    srvUrl: string;
}

export default function SettingsModal() {
    const {ml, setMl} = useMediaLibrary();
    const [open, setOpen] = useState(false);
    const [model, setModel] = useState<SettingsFormModel>({
        srvUrl: ml.srvUrl,
    });

    const option = {
        column: [
            {
                prop: "srvUrl",
                type: "input",
                label: "Media Library URL",
                placeholder: "http://example.com",
                required: true,
            },
        ],
    };

    const handleSave = () => {
        setMl({srvUrl: model.srvUrl});
        setOpen(false);
    };

    const handleOpen = () => {
        setModel({srvUrl: ml.srvUrl});
        setOpen(true);
    };

    return (
        <Dialog modal onOpenChange={setOpen} open={open}>
            <Dialog.Trigger asChild>
                <Button
                    icon={Settings}
                    onPress={handleOpen}
                    transition="all 0.2s ease"
                ></Button>
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
                        Settings
                    </Dialog.Title>
                    <DynamicForm
                        option={option}
                        model={model}
                        onChange={setModel}
                        onSave={handleSave}
                    />
                    <YStack
                        flexDirection="row"
                        justifyContent="flex-end"
                        marginTop={20}
                        gap={10}
                    >
                    </YStack>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog>
    );
}
