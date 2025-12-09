import type { ApiResponse, Interest } from '~/types/api'

export default defineEventHandler(async (event): Promise<ApiResponse<Interest[]>> => {
  // Mock interests data
  const mockInterests: Interest[] = [
    {
      id: 'interest-programming',
      userId: 'user-1',
      name: 'Programming',
      description: 'Software development and coding practices',
      active: true,
      priority: 10,
      discoveryEnabled: true,
      customFilters: {
        include: ['typescript', 'javascript', 'python'],
        exclude: ['php', 'ruby']
      },
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z'
    },
    {
      id: 'interest-ai',
      userId: 'user-1',
      name: 'AI & Machine Learning',
      description: 'Artificial intelligence and ML technologies',
      active: true,
      priority: 9,
      discoveryEnabled: true,
      customFilters: {
        include: ['machine learning', 'neural networks', 'deep learning'],
        exclude: ['crypto', 'blockchain']
      },
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z'
    },
    {
      id: 'interest-web',
      userId: 'user-1',
      name: 'Web Technologies',
      description: 'Frontend and backend web development',
      active: true,
      priority: 8,
      discoveryEnabled: true,
      customFilters: {
        include: ['react', 'vue', 'angular', 'node.js'],
        exclude: ['deprecated', 'old']
      },
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z'
    }
  ]

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 200))

  return {
    success: true,
    data: mockInterests
  }
})
