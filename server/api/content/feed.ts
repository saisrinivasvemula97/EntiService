import type { ContentItem, FeedResponse, FeedQuery } from '~/types/api'

export default defineEventHandler(async (event): Promise<{ success: boolean; data: FeedResponse }> => {
  const query: FeedQuery = getQuery(event) as FeedQuery

  // Sources data
  const sources = [
    { name: 'Hacker News', type: 'rss', reliability: 0.85 },
    { name: 'TechCrunch', type: 'rss', reliability: 0.78 },
    { name: 'The Verge', type: 'rss', reliability: 0.82 },
    { name: 'Scientific American', type: 'rss', reliability: 0.90 },
    { name: 'Harvard CS', type: 'api', reliability: 0.95 },
    { name: 'MIT Technology Review', type: 'rss', reliability: 0.88 }
  ]

  // Mock content data generator (adapted from stores/content.ts)
  const generateMockContent = (): ContentItem[] => {

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
      'The Psychology of Software Development',
      'Advanced React Patterns',
      'Node.js Performance Tuning',
      'Docker Containerization Guide',
      'Microservices Architecture',
      'Kubernetes Deployment Strategies',
      'GraphQL vs REST APIs',
      'WebAssembly: The Future of Web Performance',
      'Cryptography for Developers',
      'Functional Programming in JavaScript',
      'Real-time Communication Protocols'
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
      ['software development', 'programming'],
      ['react', 'frontend'],
      ['node.js', 'backend'],
      ['docker', 'containerization'],
      ['microservices', 'architecture'],
      ['kubernetes', 'deployment'],
      ['graphql', 'apis'],
      ['webassembly', 'performance'],
      ['cryptography', 'security'],
      ['functional programming', 'javascript'],
      ['websocket', 'real-time']
    ]

    return titles.map((title, index) => {
      const sourceIndex = index % sources.length
      const source = sources[sourceIndex]!
      const tags = tagsData[index] || []

      const publishedDate = new Date()
      publishedDate.setHours(publishedDate.getHours() - Math.random() * 72) // Wider range

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
        case 'post':
          summary = `Quick insights on ${title.toLowerCase()}. A brief but informative piece sharing practical advice and key takeaways.`
          wordCount = 200 + Math.floor(Math.random() * 400)
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
          categories: Math.random() > 0.3 ? [title.split(' ')[0]!] : undefined
        },
        userInteractions: {
          viewed: Math.random() > 0.7,
          saved: Math.random() > 0.9,
          liked: Math.random() > 0.8
        }
      }
    })
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 300))

  // Generate and process feed
  const allContent = generateMockContent()
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  let filteredContent = allContent

  // Apply filters
  if (query.contentType) {
    filteredContent = filteredContent.filter(item => item.contentType === query.contentType)
  }

  if (query.sources?.length) {
    filteredContent = filteredContent.filter(item =>
      query.sources!.includes(item.sourceName)
    )
  }

  if (query.minReliability !== undefined) {
    filteredContent = filteredContent.filter(item =>
      item.reliabilityScore >= query.minReliability!
    )
  }

  // Pagination
  const limit = Math.min(query.limit || 20, 50)
  const offset = query.offset || 0
  const paginatedContent = filteredContent.slice(offset, offset + limit)

  // Calculate stats
  const newContentItems = allContent.filter(item => {
    const ingested = new Date(item.ingestedAt)
    const now = new Date()
    return (now.getTime() - ingested.getTime()) < (24 * 60 * 60 * 1000) // Last 24 hours
  })

  const response: FeedResponse = {
    feed: paginatedContent,
    pagination: {
      total: filteredContent.length,
      limit,
      offset,
      hasMore: offset + limit < filteredContent.length
    },
    stats: {
      newContentCount: newContentItems.length,
      totalSources: sources.length,
    }
  }

  return {
    success: true,
    data: response
  }
})
