/**
 * API Composable - Centralized API client with error handling
 * Follows the structure from memory-bank/application/apis.md
 */

import type {
  ApiResponse,
  User,
  Interest,
  CreateInterestRequest,
  UpdateInterestRequest,
  FeedResponse,
  FeedQuery,
  ContentInteraction,
  DiscoveryResponse,
  SearchResponse
} from '~/types/api'

export const useApi = () => {
  const config = useRuntimeConfig()

  // Base API client with error handling
  const apiClient = $fetch.create({
    baseURL: '/api', // Nuxt 3 server API routes
    headers: {
      'Content-Type': 'application/json'
    },
    // Global error handling
    onResponseError: ({ response }) => {
      // Handle common errors
      if (response.status === 401) {
        // Unauthorized - redirect to login
        console.warn('Unauthorized, redirecting to login')
        // In CSR mode, we might need to handle auth differently
      } else if (response.status >= 500) {
        console.error('Server error:', response._data)
      }
      throw createError({
        statusCode: response.status,
        statusMessage: response.statusText,
        data: response._data
      })
    }
  })

  // Authentication endpoints
  const auth = {
    async login(credentials: { email: string; password: string }): Promise<ApiResponse<User>> {
      return apiClient('/auth/login', {
        method: 'POST',
        body: credentials
      })
    },

    async register(userData: { email: string; username: string; password: string }): Promise<ApiResponse<User>> {
      return apiClient('/auth/register', {
        method: 'POST',
        body: userData
      })
    },

    async logout(): Promise<ApiResponse<{ message: string }>> {
      return apiClient('/auth/logout', {
        method: 'POST'
      })
    },

    async refreshToken(): Promise<ApiResponse<{ accessToken: string; refreshToken: string }>> {
      return apiClient('/auth/refresh', {
        method: 'POST'
      })
    }
  }

  // User endpoints
  const user = {
    async getProfile(): Promise<ApiResponse<User>> {
      return apiClient('/user/profile')
    },

    async updateProfile(updates: Partial<User>): Promise<ApiResponse<User>> {
      return apiClient('/user/profile', {
        method: 'PATCH',
        body: updates
      })
    }
  }

  // Interests endpoints
  const interests = {
    async getAll(): Promise<ApiResponse<Interest[]>> {
      return apiClient('/interests')
    },

    async create(interest: CreateInterestRequest): Promise<ApiResponse<Interest>> {
      return apiClient('/interests', {
        method: 'POST',
        body: interest
      })
    },

    async update(id: string, updates: UpdateInterestRequest): Promise<ApiResponse<Interest>> {
      return apiClient(`/interests/${id}`, {
        method: 'PATCH',
        body: updates
      })
    },

    async delete(id: string): Promise<ApiResponse<{ message: string }>> {
      return apiClient(`/interests/${id}`, {
        method: 'DELETE'
      })
    }
  }

  // Content endpoints
  const content = {
    async getFeed(query?: FeedQuery): Promise<ApiResponse<FeedResponse>> {
      const params = new URLSearchParams()
      if (query?.limit) params.set('limit', query.limit.toString())
      if (query?.offset) params.set('offset', query.offset.toString())
      if (query?.contentType) params.set('contentType', query.contentType)
      if (query?.sources) query.sources.forEach(s => params.set('sources', s))
      if (query?.minReliability) params.set('minReliability', query.minReliability.toString())

      return apiClient(`/content/feed?${params}`)
    },

    async getContent(id: string): Promise<ApiResponse<{ content: any; interactions: any }>> {
      return apiClient(`/content/${id}`)
    },

    async interact(id: string, interaction: ContentInteraction): Promise<ApiResponse<{ message: string }>> {
      return apiClient(`/content/${id}/interact`, {
        method: 'POST',
        body: interaction
      })
    }
  }

  // Discovery endpoints
  const discovery = {
    async getSuggestions(): Promise<ApiResponse<DiscoveryResponse>> {
      return apiClient('/discovery/suggestions')
    },

    async tryNewTopics(interests: string[]): Promise<ApiResponse<DiscoveryResponse>> {
      return apiClient('/discovery/try-new', {
        method: 'POST',
        body: { interests }
      })
    }
  }

  // Search endpoints
  const search = {
    async search(query: string, filters?: { type?: string; limit?: number }): Promise<ApiResponse<SearchResponse>> {
      const params = new URLSearchParams()
      params.set('q', query)
      if (filters?.type) params.set('type', filters.type)
      if (filters?.limit) params.set('limit', filters.limit.toString())

      return apiClient(`/search?${params}`)
    }
  }

  return {
    auth,
    user,
    interests,
    content,
    discovery,
    search,
    // Direct client for custom calls if needed
    client: apiClient
  }
}
