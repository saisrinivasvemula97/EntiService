<template>
  <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-4">
        <div class="flex items-center">
          <NuxtLink to="/" class="text-2xl font-bold text-gray-900 dark:text-white">
            Enti?
          </NuxtLink>
        </div>

        <div class="flex items-center space-x-4">
          <!-- User status -->
          <div v-if="isAuthenticated" class="text-sm text-gray-600 dark:text-gray-300">
            Welcome, {{ user?.username }}
          </div>
          <div v-else class="text-sm text-gray-600 dark:text-gray-300">
            Demo Mode
          </div>

          <!-- Mode Toggle Button -->
          <button
            @click="emit('toggleMode')"
            class="p-2 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            :title="`Current mode: ${currentTimeMode}`"
          >
            <ClockIcon class="w-5 h-5" />
          </button>

          <!-- Settings -->
          <button class="p-2 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
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
