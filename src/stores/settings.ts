import { create } from "zustand"
import { persist } from "zustand/middleware"

type SettingsStore = {
  vibration: boolean
  tapAnimation: boolean
  numberAnimation: boolean
  toggleVibration: () => void
  toggleTapAnimation: () => void
  toggleNumberAnimation: () => void
}

export const useSettingsStore = create<SettingsStore>(
  // @ts-ignore
  persist(
    (set, get) => ({
      vibration: true,
      tapAnimation: true,
      numberAnimation: true,
      toggleVibration: () => set((state) => ({ vibration: !state.vibration })),
      toggleTapAnimation: () =>
        set((state) => ({ tapAnimation: !state.tapAnimation })),
      toggleNumberAnimation: () =>
        set((state) => ({ numberAnimation: !state.numberAnimation }))
    }),
    {
      name: "settings"
    }
  )
)
