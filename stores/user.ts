// User Store - Manages authentication state and user profile
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, Interest, LoginRequest, RegisterRequest, AuthResponse } from '~/types/api'

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)
  const isLoading = ref(false)
  const accessToken = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)
  const lastLoginAt = ref<string | null>(null)

  // Mock data for development
  const mockUser: User = {
    id: 'user-1',
    email: 'demo@enti.app',
    username: 'demo',
    emailVerified: true,
    lastLoginAt: new Date().toISOString(),
    createdAt: '2024-01-01T00:00:00Z',
    interests: [
      {
        id: 'interest-1',
        userId: 'user-1',
        name: 'Programming',
        description: 'Software development and computer science',
        active: true,
        priority: 5,
        discoveryEnabled: true,
        customFilters: { include: ['tutorials', 'frameworks'], exclude: ['spam'] },
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z'
      },
      {
        id: 'interest-2',
        userId: 'user-1',
        name: 'AI & Machine Learning',
        description: 'Artificial intelligence and ML technologies',
        active: true,
        priority: 4,
        discoveryEnabled: true,
        customFilters: { include: [], exclude: [] },
        createdAt: '2024-01-16T00:00:00Z',
        updatedAt: '2024-01-16T00:00:00Z'
      },
      {
        id: 'interest-3',
        userId: 'user-1',
        name: 'Web Technologies',
        description: 'Modern web development trends',
        active: true,
        priority: 3,
        discoveryEnabled: true,
        customFilters: { include: ['javascript', 'typescript', 'vue'], exclude: [] },
        createdAt: '2024-01-17T00:00:00Z',
        updatedAt: '2024-01-17T00:00:00Z'
      }
    ]
  }

  // Computed properties
  const userInterests = computed(() => user.value?.interests || [])
  const activeInterests = computed(() =>
    userInterests.value.filter(interest => interest.active)
  )
  const interestNames = computed(() =>
    activeInterests.value.map(interest => interest.name)
  )

  // Actions
  const login = async (credentials: LoginRequest): Promise<boolean> => {
    isLoading.value = true
    try {
      // Mock login - simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // For demo, accept any email/password or specific demo credentials
      const isValid = credentials.email.includes('@') &&
                     credentials.password.length >= 3

      if (isValid) {
        user.value = mockUser
        isAuthenticated.value = true
        accessToken.value = 'mock-access-token'
        refreshToken.value = 'mock-refresh-token'
        lastLoginAt.value = new Date().toISOString()
        localStorage.setItem('enti-access-token', accessToken.value)
        localStorage.setItem('enti-refresh-token', refreshToken.value)
        return true
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      console.error('Login failed:', error)
      return false
    } finally {
      isLoading.value = false
    }
  }

  const register = async (userData: RegisterRequest): Promise<boolean> => {
    isLoading.value = true
    try {
      // Mock registration - simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Mock registration success
      const newUser: User = {
        id: `user-${Date.now()}`,
        email: userData.email,
        username: userData.username,
        emailVerified: false,
        createdAt: new Date().toISOString(),
        interests: []
      }

      user.value = newUser
      isAuthenticated.value = true
      accessToken.value = 'mock-access-token'
      refreshToken.value = 'mock-refresh-token'
      localStorage.setItem('enti-access-token', accessToken.value)
      localStorage.setItem('enti-refresh-token', refreshToken.value)
      return true
    } catch (error) {
      console.error('Registration failed:', error)
      return false
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    isAuthenticated.value = false
    accessToken.value = null
    refreshToken.value = null
    localStorage.removeItem('enti-access-token')
    localStorage.removeItem('enti-refresh-token')
  }

  const updateProfile = (updates: Partial<User>) => {
    if (user.value) {
      user.value = { ...user.value, ...updates }
    }
  }

  const addInterest = (interest: Omit<Interest, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (user.value) {
      const newInterest: Interest = {
        ...interest,
        id: `interest-${Date.now()}`,
        userId: user.value.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      user.value.interests.push(newInterest)
    }
  }

  const removeInterest = (interestId: string) => {
    if (user.value) {
      user.value.interests = user.value.interests.filter(i => i.id !== interestId)
    }
  }

  const updateInterest = (interestId: string, updates: Partial<Interest>) => {
    if (user.value) {
      const index = user.value.interests.findIndex(i => i.id === interestId)
      if (index !== -1) {
        const existingInterest = user.value.interests[index]
        user.value.interests[index] = {
          ...existingInterest,
          ...updates,
          updatedAt: new Date().toISOString()
        } as Interest // Type assertion since we know existing interest has all required fields
      }
    }
  }

  const initializeFromStorage = () => {
    const storedAccessToken = localStorage.getItem('enti-access-token')
    const storedRefreshToken = localStorage.getItem('enti-refresh-token')

    if (storedAccessToken && storedRefreshToken) {
      accessToken.value = storedAccessToken
      refreshToken.value = storedRefreshToken
      isAuthenticated.value = true
      // In a real app, you'd validate the token and fetch user profile
      user.value = mockUser
    }
  }

  const refreshTokens = async () => {
    // Mock token refresh
    if (refreshToken.value) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))
        accessToken.value = 'mock-refreshed-token'
        localStorage.setItem('enti-access-token', accessToken.value)
        return true
      } catch (error) {
        logout()
        return false
      }
    }
    return false
  }

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    accessToken,
    refreshToken,
    lastLoginAt,

    // Computed
    userInterests,
    activeInterests,
    interestNames,

    // Actions
    login,
    register,
    logout,
    updateProfile,
    addInterest,
    removeInterest,
    updateInterest,
    initializeFromStorage,
    refreshTokens
  }
}, {
  // Persisted state configuration
  persist: {
    storage: persistedState.localStorage,
    pick: ['user', 'isAuthenticated', 'lastLoginAt']
  }
})
