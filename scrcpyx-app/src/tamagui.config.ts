import {createTamagui} from "tamagui"
import {defaultConfig} from '@tamagui/config/v4'
import {themes} from './themes'

// export const tamaguiConfig = createTamagui(defaultConfig)
export const tamaguiConfig = createTamagui({
    // themes
    ...defaultConfig,
})

export default tamaguiConfig

export type Conf = typeof tamaguiConfig

declare module 'tamagui' {
    interface TamaguiCustomConfig extends Conf {
    }
}

