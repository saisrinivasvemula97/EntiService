<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="emit('close')">
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4" @click.stop>
      <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Adaptive Mode Switcher</h3>

      <!-- Time Mode Selection -->
      <div class="mb-6">
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Time-based Mode</h4>
        <div class="grid grid-cols-2 gap-3">
          <button
            v-for="mode in availableTimeModes"
            :key="mode"
            @click="emit('timeModeChange', mode)"
            :class="[
              'p-3 rounded-lg border-2 transition-all text-sm font-medium',
              currentTimeMode === mode
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
            ]"
          >
            {{ getTimeModeLabel(mode) }}
            <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {{ getTimeModeDescription(mode) }}
            </div>
          </button>
        </div>
      </div>

      <!-- Content Mode Selection -->
      <div class="mb-6">
        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Content Type</h4>
        <div class="grid grid-cols-2 gap-3">
          <button
            v-for="mode in availableContentModes"
            :key="mode"
            @click="emit('contentModeChange', mode)"
            :class="[
              'p-3 rounded-lg border-2 transition-all text-sm font-medium',
              currentContentMode === mode
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
            ]"
          >
            {{ getContentModeLabel(mode) }}
          </button>
        </div>
      </div>

      <!-- Auto Mode Toggle -->
      <div class="flex items-center justify-between mb-4">
        <div>
          <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Auto Time Detection</h4>
          <p class="text-xs text-gray-500 dark:text-gray-400">Automatically switch modes based on time of day</p>
        </div>
        <button
          @click="emit('autoModeToggle')"
          :class="[
            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
            autoModeEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
          ]"
        >
          <span
            :class="[
              'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
              autoModeEnabled ? 'translate-x-6' : 'translate-x-1'
            ]"
          />
        </button>
      </div>

      <!-- Close Button -->
      <div class="flex justify-end">
        <button
          @click="emit('close')"
          class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TimeMode, ContentMode } from '~/types/ui'

interface Props {
  currentTimeMode: TimeMode
  currentContentMode: ContentMode
  availableModes: TimeMode[]
  autoModeEnabled: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  timeModeChange: [mode: TimeMode]
  contentModeChange: [mode: ContentMode]
  autoModeToggle: []
  close: []
}>()

const availableTimeModes = ['morning', 'day', 'evening', 'night'] as TimeMode[]
const availableContentModes = ['audio', 'video', 'text', 'mixed'] as ContentMode[]

const getTimeModeLabel = (mode: TimeMode): string => {
  const labels: Record<TimeMode, string> = {
    morning: '🌅 Morning',
    day: '☀️ Day',
    evening: '🌆 Evening',
    night: '🌙 Night'
  }
  return labels[mode]
}

const getTimeModeDescription = (mode: TimeMode): string => {
  const descriptions: Record<TimeMode, string> = {
    morning: '6AM-12PM',
    day: '12PM-6PM',
    evening: '6PM-10PM',
    night: '10PM-6AM'
  }
  return descriptions[mode] || ''
}

const getContentModeLabel = (mode: ContentMode): string => {
  const labels: Record<ContentMode, string> = {
    audio: '🎧 Audio',
    video: '🎥 Video',
    text: '📄 Text',
    mixed: '🔄 Mixed'
  }
  return labels[mode]
}
</script>
