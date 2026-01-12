import {create} from 'zustand'


export interface AppConfig {
    id: string
    name: string
    icon?: string
    device: string
    startApp?: string
    args?: string[]
    pinned?: boolean
}

interface AppStore {
    apps: AppConfig[]
    searchQuery: string
    addApp: (app: AppConfig) => void
    removeApp: (appId: string) => void
    setSearchQuery: (query: string) => void
    filteredApps: () => AppConfig[]
    togglePinApp: (appId: string) => void
    pinnedApps: () => AppConfig[]
}

export const useAppStore = create<AppStore>()(
    (set, get) => ({
        apps: [
            {
                id: "app1",
                name: "Calculator",
                icon: "🔢",
                device: "com.android.calculator2",
                startApp: "com.android.calculator2.Calculator"
            },
            {
                id: "app2",
                name: "Gallery",
                icon: "🖼️",
                device: "com.android.gallery3d",
                startApp: "com.android.gallery3d.app.Gallery"
            },
            {
                id: "app3",
                name: "Browser",
                icon: "🌐",
                device: "com.android.chrome",
                startApp: "com.google.android.apps.chrome.Main"
            },
            {
                id: "app4",
                name: "Messages",
                icon: "💬",
                device: "com.android.messaging",
                startApp: "com.android.messaging.MainActivity"
            },
            {
                id: "app5",
                name: "Settings",
                icon: "⚙️",
                device: "com.android.settings",
                startApp: "com.android.settings.Settings"
            }
        ],
        searchQuery: "",
        addApp: (app) => set((state) => ({apps: [...state.apps, app]})),
        removeApp: (appId) => set((state) => ({apps: state.apps.filter(app => app.id !== appId)})),
        setSearchQuery: (query) => set({searchQuery: query}),
        filteredApps: () => {
            const {apps, searchQuery} = get()
            if (!searchQuery.trim()) {
                return apps
            }
            const lowerQuery = searchQuery.toLowerCase()
            return apps.filter(app => 
                app.name.toLowerCase().includes(lowerQuery) ||
                app.device.toLowerCase().includes(lowerQuery)
            )
        },
        togglePinApp: (appId) => set((state) => ({
            apps: state.apps.map(app => 
                app.id === appId ? {...app, pinned: !app.pinned} : app
            )
        })),
        pinnedApps: () => {
            const {apps} = get()
            return apps.filter(app => app.pinned)
        }
    })
)
