<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Welcome Section -->
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold mb-4">Welcome to Enti?</h1>
      <p class="text-lg text-gray-600 dark:text-gray-300 mb-4">
        Your adaptive knowledge discovery platform
      </p>

      <!-- Quick Status -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-4 mb-8 shadow-sm">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div class="text-center">
            <div class="font-medium">Current Mode</div>
            <div class="text-blue-600 dark:text-blue-400 capitalize">
              {{ currentTimeMode }} ({{ getTimeModeEmoji(currentTimeMode) }})
            </div>
          </div>
          <div class="text-center">
            <div class="font-medium">Content Type</div>
            <div class="text-green-600 dark:text-green-400 capitalize">
              {{ currentContentMode }}
            </div>
          </div>
          <div class="text-center">
            <div class="font-medium">Feed Status</div>
            <div class="text-gray-600 dark:text-gray-400">
              {{ feedItems.length }} items loaded
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Interests Section -->
    <section class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Your Interests</h2>
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="interest in userInterests"
          :key="interest.id"
          :class="[
            'px-3 py-1 rounded-full text-sm font-medium',
            interest.active
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
          ]"
        >
          {{ interest.name }}
          <span v-if="interest.priority > 1" class="ml-1 text-xs opacity-75">
            ({{ interest.priority }})
          </span>
        </span>
      </div>
      <div v-if="userInterests.length === 0" class="text-gray-500 dark:text-gray-400">
        No interests configured yet. Click the header settings to manage.
      </div>
    </section>

    <!-- Feed Section -->
    <section>
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-semibold">Feed</h2>
        <button
          @click="refreshFeed"
          :disabled="isLoading"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isLoading ? 'Loading...' : 'Refresh' }}
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading && feedItems.length === 0" class="text-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p class="text-gray-600 dark:text-gray-400">Loading content...</p>
      </div>

      <!-- Feed Items -->
      <div v-else-if="feedItems.length > 0" class="space-y-4">
        <div
          v-for="item in feedItems"
          :key="item.id"
          class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <!-- Content Header -->
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center space-x-3">
              <div class="flex items-center space-x-2">
                <span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                  {{ getContentTypeIcon(item.contentType) }}
                  {{ item.contentType }}
                </span>
                <span
                  :class="[
                    'text-xs px-2 py-1 rounded-full',
                    getReliabilityColor(item.reliabilityScore)
                  ]"
                >
                  Trust: {{ (item.reliabilityScore * 100).toFixed(0) }}%
                </span>
              </div>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {{ item.sourceName }}
              </span>
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ new Date(item.publishedAt).toLocaleDateString() }}
            </div>
          </div>

          <!-- Content Title -->
          <h3 class="text-lg font-semibold mb-2 leading-tight">
            {{ item.title }}
          </h3>

          <!-- Content Summary -->
          <p class="text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
            {{ item.summary }}
          </p>

          <!-- Content Tags -->
          <div v-if="item.tags.length > 0" class="flex flex-wrap gap-1 mb-4">
            <span
              v-for="tag in item.tags.slice(0, 3)"
              :key="tag"
              class="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
            >
              #{{ tag }}
            </span>
          </div>

          <!-- Interaction Controls -->
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <button
                @click="toggleSave(item.id)"
                :class="[
                  'flex items-center space-x-1 px-3 py-1 rounded-md text-sm transition-colors',
                  item.userInteractions.saved
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                ]"
              >
                <span>💾</span>
                <span>{{ item.userInteractions.saved ? 'Saved' : 'Save' }}</span>
              </button>

              <button
                @click="toggleLike(item.id)"
                :class="[
                  'flex items-center space-x-1 px-3 py-1 rounded-md text-sm transition-colors',
                  item.userInteractions.liked
                    ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                ]"
              >
                <span>{{ item.userInteractions.liked ? '❤️' : '🤍' }}</span>
                <span>Like</span>
              </button>
            </div>

            <div v-if="item.metadata.readingTime" class="text-sm text-gray-500 dark:text-gray-400">
              {{ item.metadata.readingTime }} min read
            </div>
          </div>
        </div>

        <!-- Load More Button -->
        <div v-if="hasMore && !isLoading" class="text-center py-4">
          <button
            @click="loadMore"
            class="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Load More Content
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="!isLoading" class="text-center py-12">
        <div class="text-6xl mb-4">📚</div>
        <h3 class="text-xl font-semibold mb-2">No content found</h3>
        <p class="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Try adjusting your interests or refreshing the feed. Content adapts to your current time mode.
        </p>
        <button
          @click="refreshFeed"
          class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Refresh Feed
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useUIStore } from '~/stores/ui'
import { useUserStore } from '~/stores/user'
import { useContentStore } from '~/stores/content'

const uiStore = useUIStore()
const userStore = useUserStore()
const contentStore = useContentStore()

// Reactive computed properties
const currentTimeMode = computed(() => uiStore.currentTimeMode)
const currentContentMode = computed(() => uiStore.currentContentMode)
const userInterests = computed(() => userStore.activeInterests)
const feedItems = computed(() => contentStore.feedItems)
const isLoading = computed(() => contentStore.isLoading)
const hasMore = computed(() => contentStore.hasMore)

// Methods
const getTimeModeEmoji = (mode: string): string => {
  const emojis: Record<string, string> = {
    morning: '🌅',
    day: '☀️',
    evening: '🌆',
    night: '🌙'
  }
  return emojis[mode] || '🕒'
}

const getContentTypeIcon = (type: string): string => {
  const icons: Record<string, string> = {
    article: '📄',
    video: '🎥',
    podcast: '🎧',
    post: '📝'
  }
  return icons[type] || '📄'
}

const getReliabilityColor = (score: number): string => {
  if (score >= 0.8) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  if (score >= 0.6) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
  return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
}

const refreshFeed = async () => {
  const success = await contentStore.fetchFeed()
  if (!success && contentStore.feedItems.length === 0) {
    // If no content and failed to fetch, show empty state
    console.log('Failed to load feed')
  }
}

const loadMore = async () => {
  await contentStore.loadMore()
}

const toggleSave = async (itemId: string) => {
  await contentStore.interactWithContent(itemId, 'save')
}

const toggleLike = async (itemId: string) => {
  await contentStore.interactWithContent(itemId, 'like')
}

// Initialize on mount
onMounted(async () => {
  // Load initial feed
  await refreshFeed()
})
</script>
