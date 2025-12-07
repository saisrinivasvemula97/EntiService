// Content Store - Manages feed, content items, and user interactions
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ContentItem, FeedResponse, DiscoveryResponse, ContentInteraction, FeedQuery } from '~/types/api'
import type { FeedState, LoadingState } from '~/types/ui'

export const useContentStore = defineStore('content', () => {
  // State
  const feedState = ref<FeedState>({
    items: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      hasMore: true,
      isLoadingMore: false
    },
    filters: {},
    selectedItem: undefined
  })

  const loading = ref<LoadingState>({
    isLoading: false,
    retryCount: 0
  })

  // Mock content data
  const generateMockContent = (): ContentItem[] => {
    const sources = [
      { name: 'Hacker News', type: 'rss', reliability: 0.85 },
      { name: 'TechCrunch', type: 'rss', reliability: 0.78 },
      { name: 'The Verge', type: 'rss', reliability: 0.82 },
      { name: 'Scientific American', type: 'rss', reliability: 0.90 },
      { name: 'Harvard CS', type: 'api', reliability: 0.95 },
      { name: 'MIT Technology Review', type: 'rss', reliability: 0.88 }
    ]

    const titles = [
      'The Future of Distributed Computing',
      'Machine Learning Algorithms Demystified',
      'Building Scalable Web Applications',
      'Neural Networks from Scratch',
      'TypeScript Best Practices for Large Apps',
      'Understanding Quantum Algorithms',
      'Cloud Architecture Patterns',
      'Frontend Performance Optimization',
      'Database Design for Modern Apps',
      'The Psychology of Software Development'
    ]

    const tagsData = [
      ['distributed systems', 'scalability'],
      ['machine learning', 'algorithms'],
      ['web development', 'javascript'],
      ['neural networks', 'ai'],
      ['typescript', 'programming'],
      ['quantum computing', 'algorithms'],
      ['cloud', 'architecture'],
      ['performance', 'optimization'],
      ['databases', 'design'],
      ['software development', 'programming']
    ]

    return titles.map((title, index) => {
      const sourceIndex = index % sources.length
      const source = sources[sourceIndex]
      const tags = tagsData[index] || []

      const publishedDate = new Date()
      publishedDate.setHours(publishedDate.getHours() - Math.random() * 48)

      const contentTypes: Array<'article' | 'video' | 'podcast' | 'post'> =
        ['article', 'article', 'article', 'video', 'podcast', 'article', 'post', 'article']
      const contentType = contentTypes[index % contentTypes.length] || 'article'

      let summary = ''
      let wordCount = 0

      switch (contentType) {
        case 'article':
          summary = `${title}. This comprehensive guide explores the core concepts, best practices, and emerging trends in the field. Learn from industry experts and gain practical insights that can be applied immediately.`
          wordCount = 1200 + Math.floor(Math.random() * 1800)
          break
        case 'video':
          summary = `Visual explanation of ${title.toLowerCase()}. Watch as we break down complex concepts into digestible segments with practical demonstrations.`
          wordCount = 0
          break
        case 'podcast':
          summary = `Audio deep-dive on ${title.toLowerCase()}. Join the discussion with experts as they share their experiences and future predictions.`
          wordCount = 0
          break
      }

      return {
        id: `content-${index + 1}`,
        sourceType: source.type as 'rss' | 'api',
        sourceName: source.name,
        sourceUrl: `https://${source.name.toLowerCase().replace(/\s+/g, '')}.com/article-${index + 1}`,
        title,
        contentText: summary,
        summary,
        author: `Author ${index + 1}`,
        publishedAt: publishedDate.toISOString(),
        ingestedAt: new Date(publishedDate.getTime() + Math.random() * 3600000).toISOString(),
        reliabilityScore: source.reliability,
        qualityScore: 0.7 + Math.random() * 0.3,
        tags,
        contentType,
        relevanceScore: 0.6 + Math.random() * 0.4,
        matchedInterests: ['Programming', 'AI & Machine Learning', 'Web Technologies'],
        metadata: {
          wordCount,
          readingTime: wordCount > 0 ? Math.ceil(wordCount / 200) : undefined,
          images: contentType === 'article' ? [`image${index + 1}.jpg`] : undefined,
          categories: tags.length > 0 ? [tags[0]!] : undefined
        },
        userInteractions: {
          viewed: Math.random() > 0.7,
          saved: Math.random() > 0.9,
          liked: Math.random() > 0.8
        }
      }
    })
  }

  // Computed properties
  const feedItems = computed(() => feedState.value.items)
  const totalItems = computed(() =>
    feedState.value.pagination.totalPages * 10
  )
  const hasMore = computed(() => feedState.value.pagination.hasMore)
  const isLoading = computed(() => loading.value.isLoading || feedState.value.pagination.isLoadingMore)

  // Actions
  const fetchFeed = async (query: FeedQuery = {}): Promise<boolean> => {
    loading.value.isLoading = true
    loading.value.error = undefined

    try {
      // Mock API call - simulate network latency
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400))

      const mockItems = generateMockContent()
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

      // Apply filters
      let filteredItems = mockItems

      if (query.contentType) {
        filteredItems = filteredItems.filter(item => item.contentType === query.contentType)
      }

      if (query.sources?.length) {
        filteredItems = filteredItems.filter(item =>
          query.sources!.includes(item.sourceName)
        )
      }

      if (query.minReliability !== undefined) {
        filteredItems = filteredItems.filter(item =>
          item.reliabilityScore >= query.minReliability!
        )
      }

      // Paginate
      const limit = query.limit || 20
      const offset = query.offset || 0
      const startIndex = offset
      const endIndex = startIndex + limit
      const paginatedItems = filteredItems.slice(startIndex, endIndex)

      feedState.value.items = paginatedItems
      feedState.value.pagination = {
        currentPage: Math.floor(offset / limit) + 1,
        totalPages: Math.ceil(filteredItems.length / limit),
        hasMore: endIndex < filteredItems.length,
        isLoadingMore: false
      }
      feedState.value.filters = query

      return true
    } catch (error) {
      loading.value.error = error instanceof Error ? error.message : 'Failed to load feed'
      return false
    } finally {
      loading.value.isLoading = false
    }
  }

  const loadMore = async (): Promise<boolean> => {
    if (!feedState.value.pagination.hasMore || feedState.value.pagination.isLoadingMore) {
      return false
    }

    feedState.value.pagination.isLoadingMore = true

    try {
      await new Promise(resolve => setTimeout(resolve, 500))

      const currentItems = feedState.value.items.length
      const query: FeedQuery = {
        ...feedState.value.filters,
        limit: 20,
        offset: currentItems
      }

      return await fetchFeed(query)
    } catch (error) {
      feedState.value.pagination.isLoadingMore = false
      return false
    }
  }

  const getContentById = async (contentId: string): Promise<ContentItem | null> => {
    // First check if we have it in feed
    const localItem = feedState.value.items.find(item => item.id === contentId)
    if (localItem) return localItem

    // Mock API call for full content
    await new Promise(resolve => setTimeout(resolve, 300))

    const mockItem = generateMockContent().find(item => item.id === contentId)
    return mockItem || null
  }

  const interactWithContent = async (
    contentId: string,
    type: ContentInteraction['type'],
    metadata?: ContentInteraction['metadata']
  ): Promise<boolean> => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 200))

      // Update local state
      const item = feedState.value.items.find(item => item.id === contentId)
      if (item) {
        switch (type) {
          case 'save':
            item.userInteractions.saved = !item.userInteractions.saved
            break
          case 'like':
            item.userInteractions.liked = !item.userInteractions.liked
            break
          case 'view':
            item.userInteractions.viewed = true
            break
        }
      }

      return true
    } catch (error) {
      return false
    }
  }

  const discoverContent = async (): Promise<DiscoveryResponse> => {
    // Mock discovery suggestions
    await new Promise(resolve => setTimeout(resolve, 600))

    const suggestions = [
      {
        suggestedInterest: {
          name: 'DevOps & Infrastructure',
          reason: 'Based on your interest in Programming and recent articles about scalable systems'
        },
        sampleContent: [
          {
            id: 'discovery-1',
            title: 'Kubernetes for Developers',
            sourceName: 'Docker Blog',
            reliabilityScore: 0.92,
            relevanceScore: 0.85
          }
        ]
      },
      {
        suggestedInterest: {
          name: 'Blockchain Technology',
          reason: 'Related to your programming interests and distributed systems'
        },
        sampleContent: [
          {
            id: 'discovery-2',
            title: 'Smart Contract Security Patterns',
            sourceName: 'Ethereum Foundation',
            reliabilityScore: 0.88,
            relevanceScore: 0.78
          }
        ]
      }
    ]

    return { suggestions }
  }

  const searchContent = async (query: string, filters?: any): Promise<any[]> => {
    // Mock search
    await new Promise(resolve => setTimeout(resolve, 400))

    const mockItems = generateMockContent()
    const filteredResults = mockItems
      .filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.summary.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 10)

    return filteredResults.map(item => ({
      type: 'content',
      id: item.id,
      title: item.title,
      highlights: [`"${query}"`],
      relevanceScore: 0.8 + Math.random() * 0.2
    }))
  }

  const setSelectedItem = (contentId?: string) => {
    feedState.value.selectedItem = contentId
  }

  const clearFeed = () => {
    feedState.value = {
      items: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        hasMore: true,
        isLoadingMore: false
      },
      filters: {},
      selectedItem: undefined
    }
    loading.value = {
      isLoading: false,
      retryCount: 0
    }
  }

  return {
    // State
    feedState,
    loading,

    // Computed
    feedItems,
    totalItems,
    hasMore,
    isLoading,

    // Actions
    fetchFeed,
    loadMore,
    getContentById,
    interactWithContent,
    discoverContent,
    searchContent,
    setSelectedItem,
    clearFeed
  }
})
