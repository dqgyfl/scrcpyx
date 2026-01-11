import { createThemes, defaultComponentThemes } from '@tamagui/theme-builder'
import * as Colors from '@tamagui/colors'

const darkPalette = ['hsla(0, 15%, 50%, 1)','hsla(250, 50%, 43%, 0)','hsla(250, 50%, 43%, 0.2)','hsla(250, 50%, 43%, 0.4)','hsla(250, 50%, 43%, 0.6)','hsla(250, 50%, 43%, 0.8)','hsla(250, 50%, 35%, 1)','hsla(250, 50%, 38%, 1)','hsla(250, 50%, 41%, 1)','hsla(250, 50%, 43%, 1)','hsla(250, 50%, 46%, 1)','hsla(250, 50%, 49%, 1)','hsla(250, 50%, 52%, 1)','hsla(250, 50%, 54%, 1)','hsla(250, 50%, 57%, 1)','hsla(250, 50%, 60%, 1)','hsla(250, 50%, 90%, 1)','hsla(250, 50%, 95%, 1)','hsla(250, 50%, 60%, 0.8)','hsla(250, 50%, 60%, 0.6)','hsla(250, 50%, 60%, 0.4)','hsla(250, 50%, 60%, 0.2)','hsla(250, 50%, 60%, 0)','hsla(0, 15%, 12%, 1)']
const lightPalette = ['hsla(0, 15%, 88%, 1)','hsla(250, 50%, 48%, 0)','hsla(250, 50%, 48%, 0.2)','hsla(250, 50%, 48%, 0.4)','hsla(250, 50%, 48%, 0.6)','hsla(250, 50%, 48%, 0.8)','hsla(250, 50%, 40%, 1)','hsla(250, 50%, 43%, 1)','hsla(250, 50%, 46%, 1)','hsla(250, 50%, 48%, 1)','hsla(250, 50%, 51%, 1)','hsla(250, 50%, 54%, 1)','hsla(250, 50%, 57%, 1)','hsla(250, 50%, 59%, 1)','hsla(250, 50%, 62%, 1)','hsla(250, 50%, 65%, 1)','hsla(250, 50%, 95%, 1)','hsla(250, 50%, 95%, 1)','hsla(250, 50%, 65%, 0.8)','hsla(250, 50%, 65%, 0.6)','hsla(250, 50%, 65%, 0.4)','hsla(250, 50%, 65%, 0.2)','hsla(250, 50%, 65%, 0)','hsla(0, 15%, 50%, 1)']

const lightShadows = {
  shadow1: 'rgba(0,0,0,0.04)',
  shadow2: 'rgba(0,0,0,0.08)',
  shadow3: 'rgba(0,0,0,0.16)',
  shadow4: 'rgba(0,0,0,0.24)',
  shadow5: 'rgba(0,0,0,0.32)',
  shadow6: 'rgba(0,0,0,0.4)',
}

const darkShadows = {
  shadow1: 'rgba(0,0,0,0.2)',
  shadow2: 'rgba(0,0,0,0.3)',
  shadow3: 'rgba(0,0,0,0.4)',
  shadow4: 'rgba(0,0,0,0.5)',
  shadow5: 'rgba(0,0,0,0.6)',
  shadow6: 'rgba(0,0,0,0.7)',
}

// we're adding some example sub-themes for you to show how they are done, "success" "warning", "error":

const builtThemes = createThemes({


  base: {
    palette: {
      dark: darkPalette,
      light: lightPalette,
    },

    extra: {
      light: {
        background: "transparent",
        ...Colors.green,
        ...Colors.red,
        ...Colors.yellow,
        ...lightShadows,
        shadowColor: lightShadows.shadow1,
      },
      dark: {
        background: "transparent",
        ...Colors.greenDark,
        ...Colors.redDark,
        ...Colors.yellowDark,
        ...darkShadows,
        shadowColor: darkShadows.shadow1,
      },
    },
  },

  accent: {
    palette: {
      dark: ['hsla(0, 15%, 50%, 1)','hsla(250, 50%, 43%, 0)','hsla(250, 50%, 43%, 0.2)','hsla(250, 50%, 43%, 0.4)','hsla(250, 50%, 43%, 0.6)','hsla(250, 50%, 43%, 0.8)','hsla(250, 50%, 35%, 1)','hsla(250, 50%, 38%, 1)','hsla(250, 50%, 41%, 1)','hsla(250, 50%, 43%, 1)','hsla(250, 50%, 46%, 1)','hsla(250, 50%, 49%, 1)','hsla(250, 50%, 52%, 1)','hsla(250, 50%, 54%, 1)','hsla(250, 50%, 57%, 1)','hsla(250, 50%, 60%, 1)','hsla(250, 50%, 90%, 1)','hsla(250, 50%, 95%, 1)','hsla(250, 50%, 60%, 0.8)','hsla(250, 50%, 60%, 0.6)','hsla(250, 50%, 60%, 0.4)','hsla(250, 50%, 60%, 0.2)','hsla(250, 50%, 60%, 0)','hsla(0, 15%, 12%, 1)'],
      light: ['hsla(0, 15%, 88%, 1)','hsla(250, 50%, 48%, 0)','hsla(250, 50%, 48%, 0.2)','hsla(250, 50%, 48%, 0.4)','hsla(250, 50%, 48%, 0.6)','hsla(250, 50%, 48%, 0.8)','hsla(250, 50%, 40%, 1)','hsla(250, 50%, 43%, 1)','hsla(250, 50%, 46%, 1)','hsla(250, 50%, 48%, 1)','hsla(250, 50%, 51%, 1)','hsla(250, 50%, 54%, 1)','hsla(250, 50%, 57%, 1)','hsla(250, 50%, 59%, 1)','hsla(250, 50%, 62%, 1)','hsla(250, 50%, 65%, 1)','hsla(250, 50%, 95%, 1)','hsla(250, 50%, 95%, 1)','hsla(250, 50%, 65%, 0.8)','hsla(250, 50%, 65%, 0.6)','hsla(250, 50%, 65%, 0.4)','hsla(250, 50%, 65%, 0.2)','hsla(250, 50%, 65%, 0)','hsla(0, 15%, 50%, 1)'],
    },
  },

  childrenThemes: {
    warning: {
      palette: {
        dark: Object.values(Colors.yellowDark),
        light: Object.values(Colors.yellow),
      },
    },

    error: {
      palette: {
        dark: Object.values(Colors.redDark),
        light: Object.values(Colors.red),
      },
    },

    success: {
      palette: {
        dark: Object.values(Colors.greenDark),
        light: Object.values(Colors.green),
      },
    },
  },
})

export type Themes = typeof builtThemes

// this is optional, but saves client-side JS bundle size by leaving out themes on client.
// tamagui automatically hydrates themes from css back into JS for you and the tamagui
// bundler plugins automate setting TAMAGUI_ENVIRONMENT.

export const themes: Themes =
  process.env.TAMAGUI_ENVIRONMENT === 'client' &&
  process.env.NODE_ENV === 'production'
    ? ({} as any)
    : (builtThemes as any)
