import {create} from 'zustand'


export interface AppConfig {
    id: string
    name: string
    icon?: string
    device: string
    startApp?: string
    args?: string[]
}

interface AppStore {
    apps: AppConfig[]
    addApp: (app: AppConfig) => void
}

export const useAppStore = create<AppStore>()(
    (set) => ({
        apps: [],
        addApp: (app) => set((state) => ({apps: [...state.apps, app]})),
    })
)
