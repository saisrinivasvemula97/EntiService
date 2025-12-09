<template>
  <header class="shadow-sm border-b mode-transition" :style="{ backgroundColor: 'var(--theme-surface)', borderColor: 'var(--theme-border)' }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-4">
        <div class="flex items-center">
          <NuxtLink to="/" class="text-2xl font-bold" :style="{ color: 'var(--theme-text)' }">
            Enti?
          </NuxtLink>
        </div>

        <div class="flex items-center space-x-4">
          <!-- User status -->
          <div v-if="isAuthenticated" class="text-sm" :style="{ color: 'var(--theme-text-secondary)' }">
            Welcome, {{ user?.username }}
          </div>
          <div v-else class="text-sm" :style="{ color: 'var(--theme-text-secondary)' }">
            Demo Mode
          </div>

          <!-- Mode Toggle Button -->
          <button
            @click="emit('toggleMode')"
            class="p-2 rounded-md transition-all interactive-element"
            :style="{ color: 'var(--theme-text-secondary)' }"
            :title="`Current mode: ${currentTimeMode}`"
          >
            <ClockIcon class="w-5 h-5" />
          </button>

          <!-- Settings -->
          <button class="p-2 rounded-md transition-all interactive-element" :style="{ color: 'var(--theme-text-secondary)' }">
            <CogIcon class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUIStore } from '~/stores/ui'
import { useUserStore } from '~/stores/user'

const emit = defineEmits<{
  toggleMode: []
}>()

const uiStore = useUIStore()
const userStore = useUserStore()

const isAuthenticated = computed(() => userStore.isAuthenticated)
const user = computed(() => userStore.user)
const currentTimeMode = computed(() => uiStore.currentTimeMode)
</script>
