<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <AppHeader @toggle-mode="toggleModeSwitcher" />

    <!-- Mode Switcher (when active) -->
    <ModeSwitcher
      v-if="showModeSwitcher"
      :current-time-mode="currentTimeMode"
      :current-content-mode="currentContentMode"
      :available-modes="availableModes"
      :auto-mode-enabled="autoModeEnabled"
      @time-mode-change="handleTimeModeChange"
      @content-mode-change="handleContentModeChange"
      @auto-mode-toggle="handleAutoModeToggle"
      @close="showModeSwitcher = false"
    />

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUIStore } from '~/stores/ui'
import { useUserStore } from '~/stores/user'
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
import ModeSwitcher from '~/components/ModeSwitcher.vue'

const uiStore = useUIStore()
const userStore = useUserStore()

// Local state
const showModeSwitcher = ref(false)

// Computed from stores
const currentTimeMode = computed(() => uiStore.currentTimeMode)
const currentContentMode = computed(() => uiStore.currentContentMode)
const autoModeEnabled = computed(() => uiStore.autoModeEnabled)
const availableModes = computed(() => ['morning', 'day', 'evening', 'night'] as const)

// Methods
const toggleModeSwitcher = () => {
  showModeSwitcher.value = !showModeSwitcher.value
}

const handleTimeModeChange = (mode: string) => {
  uiStore.setTimeMode(mode as any)
}

const handleContentModeChange = (mode: string) => {
  uiStore.setContentMode(mode as any)
}

const handleAutoModeToggle = () => {
  uiStore.toggleAutoMode()
}

// Initialize on mount
onMounted(() => {
  // Initialize UI preferences from browser
  uiStore.initializeFromBrowser()

  // Initialize user from storage if available
  if (!userStore.isAuthenticated) {
    userStore.initializeFromStorage()
  }
})
</script>
