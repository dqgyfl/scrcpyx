// useWindowStore.ts
import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import {Dimensions} from "react-native";

export interface WindowState {
    id: string
    appId: string
    props?: any
    x: number
    y: number
    width: number
    height: number
    restore?: {
        x: number
        y: number
        width: number
        height: number
    }
    zIndex: number
    minimized: boolean
    fullscreen: boolean
}

interface WindowStore {
    windows: Record<string, WindowState>
    topZ: number

    openApp: (appId: string, props?: any) => void
    closeWindow: (id: string) => void
    focusWindow: (id: string) => void
    moveWindow: (id: string, x: number, y: number) => void
    resizeWindow: (id: string, width: number, height: number) => void
    toggleMinimize: (id: string) => void
    toggleFullscreen: (id: string) => void
}

export const useWindowStore = create<WindowStore>()(
    (set, get) => ({
        windows: {},
        topZ: 1,

        openApp: (appId, props) => {
            // const id = `${appId}-${Date.now()}`
            const id = appId
            const windows = get().windows
            const windowCount = Object.keys(windows).length
            // Add slight offset for each new window
            const offsetX = windowCount * 20
            const offsetY = windowCount * 20
            set({
                windows: {
                    ...windows,
                    [id]: {
                        id,
                        appId,
                        props,
                        x: 100 + offsetX,
                        y: 100 + offsetY,
                        width: 600,
                        height: 400,
                        zIndex: get().topZ + 1,
                        minimized: false,
                        fullscreen: false,
                    },
                },
                topZ: get().topZ + 1,
            })
        },

        closeWindow: (id) =>
            set((state) => {
                const windows = {...state.windows}
                delete windows[id]
                return {windows}
            }),

        focusWindow: (id) =>
            set((state) => {
                const windows = {...state.windows}
                Object.values(windows).forEach((w) => {
                    if (w.id === id) w.zIndex = state.topZ + 1
                })
                return {windows, topZ: state.topZ + 1}
            }),

        moveWindow: (id, x, y) =>
            set((state) => ({
                windows: {...state.windows, [id]: {...state.windows[id], x, y}},
            })),

        resizeWindow: (id, width, height) =>
            set((state) => ({
                windows: {...state.windows, [id]: {...state.windows[id], width, height}},
            })),

        toggleMinimize: (id) =>
            set((state) => ({
                windows: {
                    ...state.windows,
                    [id]: {...state.windows[id], minimized: !state.windows[id].minimized},
                },
            })),
        toggleFullscreen: (id) =>
            set((state) => {
                const w = state.windows[id]
                if (!w) return state

                // ENTER fullscreen
                if (!w.fullscreen) {
                    return {
                        windows: {
                            ...state.windows,
                            [id]: {
                                ...w,
                                fullscreen: true,
                                restore: {
                                    x: w.x,
                                    y: w.y,
                                    width: w.width,
                                    height: w.height,
                                },
                                x: 0,
                                y: 0,
                                width: Dimensions.get('screen').width,
                                height: Dimensions.get('screen').height,
                                zIndex: state.topZ + 1,
                            },
                        },
                        topZ: state.topZ + 1,
                    }
                }

                // EXIT fullscreen
                return {
                    windows: {
                        ...state.windows,
                        [id]: {
                            ...w,
                            fullscreen: false,
                            ...w.restore!,
                            restore: undefined,
                        },
                    },
                }
            }),
    })
)
