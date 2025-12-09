import type { ApiResponse, DiscoveryResponse } from '~/types/api'

export default defineEventHandler(async (event): Promise<ApiResponse<DiscoveryResponse>> => {
  // Mock discovery suggestions
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
        },
        {
          id: 'discovery-2',
          title: 'CI/CD Best Practices',
          sourceName: 'GitHub Engineering',
          reliabilityScore: 0.89,
          relevanceScore: 0.78
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
          id: 'discovery-3',
          title: 'Smart Contract Security Patterns',
          sourceName: 'Ethereum Foundation',
          reliabilityScore: 0.88,
          relevanceScore: 0.78
        },
        {
          id: 'discovery-4',
          title: 'Consensus Mechanisms Explained',
          sourceName: 'Blockchain.com',
          reliabilityScore: 0.85,
          relevanceScore: 0.72
        }
      ]
    },
    {
      suggestedInterest: {
        name: 'Quantum Computing',
        reason: 'Aligned with your interest in algorithms and emerging technologies'
      },
      sampleContent: [
        {
          id: 'discovery-5',
          title: 'Introduction to Quantum Algorithms',
          sourceName: 'IBM Research',
          reliabilityScore: 0.95,
          relevanceScore: 0.75
        }
      ]
    }
  ]

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 400))

  return {
    success: true,
    data: { suggestions }
  }
})
