import {Button, Dialog, Text, YStack} from 'tamagui'
import {useAppStore} from './AppStore'
import {FormOption} from "@/pages/scrcpyx/XFormField";
import React, {useEffect, useState} from "react";
import {DynamicForm} from "@/pages/scrcpyx/XForm";
import {Plus} from "@tamagui/lucide-icons";
import {useListDevices, useListApps} from "@/api/scrcpyx_mgr";

export default function AddAppModal() {
    const {addApp} = useAppStore()
    const {data: devices, isLoading: isLoadingDevices} = useListDevices();
    
    const [model, setModel] = useState({})
    const [devicesOptions, setDevicesOptions] = useState<{ label: string; value: string }[]>([]);
    const [appsOptions, setAppsOptions] = useState<{ label: string; value: string }[]>([]);
    
    // Track selected device to fetch apps
    const selectedDeviceId = model.device as string;
    const {data: apps, isLoading: isLoadingApps} = useListApps(selectedDeviceId || '');

    useEffect(() => {
        if (devices?.devices) {
            const options = devices.devices.map(device => ({
                label: `${device.model || 'Unknown Device'} (${device.did || 'Unknown ID'})`,
                value: device.did || ''
            }));
            setDevicesOptions(options);
        }
    }, [devices]);
    
    useEffect(() => {
        if (apps?.apps && selectedDeviceId) {
            const options = apps.apps.map(app => ({
                label: app.packageName,
                value: app.packageName
            }));
            setAppsOptions(options);
        } else {
            setAppsOptions([]);
        }
    }, [apps, selectedDeviceId]);

    const option: FormOption = {
        column: [
            {prop: 'id', label: 'App ID', type: 'input', required: true},
            {prop: 'name', label: 'App Name', type: 'input', required: true},
            {prop: 'icon', label: 'App Icon (emoji)', type: 'input'},
            {
                prop: 'device', 
                label: 'Device', 
                type: 'select',
                required: true,
                options: devicesOptions
            },
            {
                prop: 'packageName',
                label: 'Package Name',
                type: 'select',
                required: false,
                options: appsOptions,
                disabled: isLoadingApps || !selectedDeviceId
            },
            { prop: 'args', label: 'Arguments', type: 'input', required: false, placeholder: 'Command line arguments for the app' },
        ],
    }

    const handleAddApp = () => {
        addApp({
            ...model,
            device: model.device || '',
            name: model.name || '',
            id: model.id || '',
            packageName: model.packageName || '',
            args: typeof model.args === 'string' ? model.args.split(' ').filter(arg => arg.trim() !== '') : []
        });
    };

    return <Dialog modal>
        <Dialog.Trigger asChild>
            <Button 
                icon={Plus} 
                borderRadius="$4" 
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
                    onSave={handleAddApp}
                />
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog>
}