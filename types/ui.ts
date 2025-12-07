// UI Types for Adaptive Interface based on memory-bank/presentation/adaptive-ui.md

export enum TimeMode {
  MORNING = 'morning',   // 6AM-12PM: Audio focus
  DAY = 'day',          // 12PM-6PM: Mixed content
  EVENING = 'evening',  // 6PM-10PM: Video focus
  NIGHT = 'night'       // 10PM-6AM: Text focus
}

export enum ContentMode {
  TEXT = 'text',        // Articles, long-form
  AUDIO = 'audio',      // Podcasts, summaries
  VIDEO = 'video',      // Shorts, demos, explainers
  MIXED = 'mixed'       // User choice or default
}

// Time-based adaptation data
export interface TimeModeConfig {
  startHour: number
  endHour: number
  icon: string
  primaryContentType: ContentMode
  theme: {
    primaryColor: string
    backgroundColor: string
    fontSize: string
    lineHeight: string
  }
  layout: {
    gridColumns: number
    cardSize: 'small' | 'medium' | 'large'
    showTimestamps: boolean
    showMetadata: boolean
  }
}

// Content type adaptations
export interface ContentAdaptation {
  displayName: string
  icon: string
  previewText?: string
  actions: string[]
  metadata: {
    showAuthor: boolean
    showSource: boolean
    showTimeAgo: boolean
    showTrustScore: boolean
  }
}

// Component states
export interface LoadingState {
  isLoading: boolean
  error?: string
  retryCount: number
}

export interface FeedState {
  items: import('./api').ContentItem[]
  pagination: {
    currentPage: number
    totalPages: number
    hasMore: boolean
    isLoadingMore: boolean
  }
  filters: import('./api').FeedQuery
  selectedItem?: string
}

// UI preferences
export interface UserPreferences {
  timeMode: TimeMode
  contentMode: ContentMode
  theme: 'light' | 'dark' | 'auto'
  fontSize: 'small' | 'medium' | 'large'
  showAnimations: boolean
  reduceMotion: boolean
  highContrast: boolean
}

// Adaptive UI state
export interface AdaptiveUIState {
  currentTimeMode: TimeMode
  currentContentMode: ContentMode
  preferences: UserPreferences
  isTransitioning: boolean
  lastModeChange: number
  autoModeEnabled: boolean
}

// Component Props Types
export interface ContentCardProps {
  item: import('./api').ContentItem
  displayMode: TimeMode
  showInteractions?: boolean
  size?: 'compact' | 'normal' | 'featured'
  onInteraction?: (itemId: string, type: string, metadata?: any) => void
}

export interface FeedContainerProps {
  timeMode: TimeMode
  contentMode: ContentMode
  items: import('./api').ContentItem[]
  loading?: LoadingState
  onLoadMore?: () => void
  onItemInteraction?: (itemId: string, type: string, metadata?: any) => void
}

export interface ModeSwitcherProps {
  currentTimeMode: TimeMode
  currentContentMode: ContentMode
  availableModes: TimeMode[]
  onTimeModeChange: (mode: TimeMode) => void
  onContentModeChange: (mode: ContentMode) => void
  autoModeEnabled: boolean
  onAutoModeToggle: () => void
}

// Layout configurations
export interface ResponsiveConfig {
  breakpoints: {
    xs: number // 0-639px
    sm: number // 640-767px
    md: number // 768-1023px
    lg: number // 1024-1279px
    xl: number // 1280px+
  }
  grid: {
    [key in TimeMode]: {
      columns: {
        xs: number
        sm: number
        md: number
        lg: number
        xl: number
      }
      gap: string
    }
  }
}

// Trust/reliability visualization
export interface TrustIndicatorProps {
  score: number // 0-1 scale
  source: string
  size?: 'small' | 'medium' | 'large'
  showLabel?: boolean
}

// Navigation and routing
export interface NavigationState {
  currentRoute: string
  previousRoute?: string
  feedView: 'list' | 'grid' | 'timeline'
  sidebarOpen: boolean
  searchOpen: boolean
}

// Animation and transition types
export interface TransitionConfig {
  duration: number
  easing: string
  delay?: number
}

export interface AnimatePresenceConfig {
  enter: TransitionConfig
  exit: TransitionConfig
  initial?: boolean
}
