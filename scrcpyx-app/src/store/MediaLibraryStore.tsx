import {create} from 'zustand'

import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface MediaLibrary {
    id: string,
    // path: string
    srvUrl: string
    mode: string
    section: boolean
}

interface MediaLibraryStore {
    ml: MediaLibrary
    setMl: (ml: Partial<MediaLibrary>) => void
}

export const useMediaLibrary = create<MediaLibraryStore>()(
    persist((set) => ({
            ml: {
                id: "scans/bd",
                srvUrl: "http://tau-player.srv",
                mode: "front",
                section: true
            },
            setMl(ml) {
                set((state) => ({
                        ml: {...state.ml, ...ml}
                    })
                )
            }
        }),
        {
            name: 'media-library',
            storage: createJSONStorage(() => AsyncStorage)
        })
);
