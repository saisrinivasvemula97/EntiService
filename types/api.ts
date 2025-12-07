// API Response and Request Types based on memory-bank/application/apis.md

export interface ApiResponse<T> {
  success: boolean
  data: T
  error?: {
    code: string
    message: string
    details?: any
    correlationId?: string
  }
}

// Authentication Types
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  username: string
  password: string
}

export interface AuthResponse {
  user: User
  tokens: {
    accessToken: string
    refreshToken: string
    expiresIn: number
  }
}

// User Types
export interface User {
  id: string
  email: string
  username: string
  emailVerified: boolean
  lastLoginAt?: string
  createdAt: string
  interests: Interest[]
}

// Interest Types
export interface Interest {
  id: string
  userId: string
  name: string
  description?: string
  active: boolean
  priority: number
  discoveryEnabled: boolean
  customFilters: CustomFilters
  createdAt: string
  updatedAt: string
}

export interface CustomFilters {
  include: string[]
  exclude: string[]
}

export interface CreateInterestRequest {
  name: string
  description?: string
  priority?: number
  customFilters?: CustomFilters
}

export interface UpdateInterestRequest {
  name?: string
  description?: string
  priority?: number
  active?: boolean
  discoveryEnabled?: boolean
  customFilters?: CustomFilters
}

// Content Types
export interface ContentItem {
  id: string
  sourceType: string
  sourceName: string
  sourceUrl: string
  title: string
  contentText?: string
  contentHtml?: string
  summary?: string
  author?: string
  publishedAt: string
  ingestedAt: string
  reliabilityScore: number
  qualityScore: number
  tags: string[]
  contentType: 'article' | 'video' | 'podcast' | 'post'
  relevanceScore?: number
  matchedInterests: string[]
  metadata: ContentMetadata
  userInteractions: UserInteractions
}

export interface ContentMetadata {
  wordCount?: number
  readingTime?: number
  images?: string[]
  categories?: string[]
}

export interface UserInteractions {
  viewed: boolean
  saved: boolean
  liked: boolean
}

// Feed Types
export interface FeedResponse {
  feed: ContentItem[]
  pagination: PaginationInfo
  stats: FeedStats
}

export interface PaginationInfo {
  total: number
  limit: number
  offset: number
  hasMore: boolean
}

export interface FeedStats {
  newContentCount: number
  totalSources: number
}

// Interaction Types
export interface ContentInteraction {
  type: 'view' | 'save' | 'share' | 'dismiss' | 'report' | 'like'
  metadata?: {
    duration?: number
    rating?: number
    notes?: string
  }
}

// Discovery Types
export interface DiscoveryResponse {
  suggestions: DiscoverySuggestion[]
}

export interface DiscoverySuggestion {
  suggestedInterest: {
    name: string
    reason: string
  }
  sampleContent: ContentSample[]
}

export interface ContentSample {
  id: string
  title: string
  sourceName: string
  reliabilityScore: number
  relevanceScore: number
}

// Search Types
export interface SearchResponse {
  results: SearchResult[]
  total: number
  searchTime: number
}

export interface SearchResult {
  type: 'content' | 'interests' | 'sources'
  id: string
  title?: string
  highlights: string[]
  relevanceScore: number
}

// Feed Query Parameters
export interface FeedQuery {
  limit?: number
  offset?: number
  contentType?: 'article' | 'video' | 'podcast'
  sources?: string[]
  minReliability?: number
}
