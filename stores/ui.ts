// UI Store - Manages adaptive interface state and user preferences
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { TimeMode, ContentMode } from '~/types/ui'
import type { AdaptiveUIState, UserPreferences } from '~/types/ui'

export const useUIStore = defineStore('ui', () => {
  // State
  const state = ref<AdaptiveUIState>({
    currentTimeMode: TimeMode.DAY, // Default to day mode
    currentContentMode: ContentMode.MIXED,
    preferences: {
      timeMode: TimeMode.DAY,
      contentMode: ContentMode.MIXED,
      theme: 'auto',
      fontSize: 'medium',
      showAnimations: true,
      reduceMotion: false,
      highContrast: false
    },
    isTransitioning: false,
    lastModeChange: Date.now(),
    autoModeEnabled: true
  })

  // Computed properties
  const isDarkMode = computed(() => {
    if (state.value.preferences.theme === 'dark') return true
    if (state.value.preferences.theme === 'light') return false
    // auto mode - based on time
    return state.value.currentTimeMode === TimeMode.NIGHT
  })

  const currentTimeMode = computed(() => state.value.currentTimeMode)
  const currentContentMode = computed(() => state.value.currentContentMode)
  const isTransitioning = computed(() => state.value.isTransitioning)
  const autoModeEnabled = computed(() => state.value.autoModeEnabled)

  // Actions
  const detectTimeMode = (): TimeMode => {
    const now = new Date()
    const hour = now.getHours()

    if (hour >= 6 && hour < 12) return TimeMode.MORNING
    if (hour >= 12 && hour < 18) return TimeMode.DAY
    if (hour >= 18 && hour < 22) return TimeMode.EVENING
    return TimeMode.NIGHT
  }

  const setTimeMode = (mode: TimeMode) => {
    if (state.value.currentTimeMode !== mode) {
      state.value.isTransitioning = true
      state.value.lastModeChange = Date.now()

      // Update preferred content mode based on time mode
      const defaultContentMode = getDefaultContentModeForTime(mode)
      state.value.currentContentMode = defaultContentMode
      state.value.preferences.contentMode = defaultContentMode

      state.value.currentTimeMode = mode
      state.value.preferences.timeMode = mode

      // Reset transition after animation
      setTimeout(() => {
        state.value.isTransitioning = false
      }, 300)
    }
  }

  const setContentMode = (mode: ContentMode) => {
    state.value.currentContentMode = mode
    state.value.preferences.contentMode = mode
  }

  const toggleAutoMode = () => {
    state.value.autoModeEnabled = !state.value.autoModeEnabled
    if (state.value.autoModeEnabled) {
      // Switch to auto-detected mode
      const detectedMode = detectTimeMode()
      setTimeMode(detectedMode)
    }
  }

  const updatePreferences = (prefs: Partial<UserPreferences>) => {
    state.value.preferences = { ...state.value.preferences, ...prefs }

    // Apply theme to document
    const html = document.documentElement
    if (state.value.preferences.theme === 'dark') {
      html.classList.add('dark')
    } else if (state.value.preferences.theme === 'light') {
      html.classList.remove('dark')
    } else {
      // auto - based on time mode
      if (state.value.currentTimeMode === TimeMode.NIGHT) {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
    }

    // Apply font size
    html.setAttribute('data-font-size', prefs.fontSize || state.value.preferences.fontSize)

    // Apply accessibility preferences
    if (prefs.reduceMotion || state.value.preferences.reduceMotion) {
      html.setAttribute('data-reduce-motion', 'true')
    }
    if (prefs.highContrast || state.value.preferences.highContrast) {
      html.setAttribute('data-high-contrast', 'true')
    }
  }

  const getDefaultContentModeForTime = (timeMode: TimeMode): ContentMode => {
    const defaults: Record<TimeMode, ContentMode> = {
      [TimeMode.MORNING]: ContentMode.AUDIO,
      [TimeMode.DAY]: ContentMode.MIXED,
      [TimeMode.EVENING]: ContentMode.VIDEO,
      [TimeMode.NIGHT]: ContentMode.TEXT
    }
    return defaults[timeMode]
  }

  const initializeFromBrowser = () => {
    // Check for saved preferences in localStorage (handled by persisted state)
    // Initialize theme
    updatePreferences({})

    // Start time detection if auto mode enabled
    if (state.value.autoModeEnabled) {
      const detectedMode = detectTimeMode()
      setTimeMode(detectedMode)

      // Set up periodic time checking
      setInterval(() => {
        if (state.value.autoModeEnabled) {
          const newMode = detectTimeMode()
          if (newMode !== state.value.currentTimeMode) {
            setTimeMode(newMode)
          }
        }
      }, 60000) // Check every minute
    }
  }

  // Watchers
  watch(() => state.value.currentTimeMode, (newMode) => {
    if (state.value.autoModeEnabled) {
      const defaultMode = getDefaultContentModeForTime(newMode)
      setContentMode(defaultMode)
    }
  })

  return {
    // State
    state,

    // Computed
    isDarkMode,
    currentTimeMode,
    currentContentMode,
    isTransitioning,
    autoModeEnabled,

    // Actions
    setTimeMode,
    setContentMode,
    toggleAutoMode,
    updatePreferences,
    initializeFromBrowser,
    getDefaultContentModeForTime
  }
}, {
  // Persisted state configuration
  persist: {
    storage: persistedState.localStorage,
    pick: ['preferences', 'autoModeEnabled']
  }
})
