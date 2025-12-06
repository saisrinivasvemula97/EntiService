<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">Enti?</h1>
          </div>
          <nav class="hidden md:flex space-x-8">
            <a href="#" class="text-gray-500 hover:text-gray-900">About</a>
            <a href="#" class="text-gray-500 hover:text-gray-900">How It Works</a>
            <a href="#" class="btn btn-outline">Get Started</a>
          </nav>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="bg-gradient-to-b from-blue-50 to-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Knowledge Discovery<br>
          <span class="text-blue-600">Without the Social Noise</span>
        </h2>
        <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Discover content based on your interests, not algorithms. Enti? adapts to your preferred learning style and time of day.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="btn btn-primary text-lg px-8 py-3">Start Your Journey</button>
          <button class="btn btn-outline text-lg px-8 py-3">See How It Works</button>
        </div>
      </div>
    </section>

    <!-- Interest Selection Demo -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h3 class="text-3xl font-bold text-gray-900 mb-4">What Interests You?</h3>
          <p class="text-lg text-gray-600">Select topics that matter to you. We'll find relevant content from diverse, trusted sources.</p>
        </div>

        <div class="grid-responsive gap-4 mb-8">
          <div class="card text-center hover:shadow-lg transition-shadow">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <h4 class="font-semibold text-gray-900 mb-2">Programming</h4>
            <div class="trust-indicator trust-high mb-2">
              <span class="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
              High Trust
            </div>
          </div>

          <div class="card text-center hover:shadow-lg transition-shadow">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
              </svg>
            </div>
            <h4 class="font-semibold text-gray-900 mb-2">Science</h4>
            <div class="trust-indicator trust-high mb-2">
              <span class="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
              High Trust
            </div>
          </div>

          <div class="card text-center hover:shadow-lg transition-shadow">
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <h4 class="font-semibold text-gray-900 mb-2">History</h4>
            <div class="trust-indicator trust-high mb-2">
              <span class="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
              High Trust
            </div>
          </div>
        </div>

        <div class="text-center">
          <button class="btn btn-primary text-lg px-8 py-3">Customize Interests</button>
        </div>
      </div>
    </section>

    <!-- Adaptive Interface Preview -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h3 class="text-3xl font-bold text-gray-900 mb-4">Adaptive to Your Time & Preferences</h3>
          <p class="text-lg text-gray-600">Content adapts to how and when you want to learn.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Morning (Audio) Mode -->
          <div class="text-center">
            <div class="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
            <h4 class="text-xl font-semibold text-gray-900 mb-2">Morning (Audio)</h4>
            <p class="text-gray-600 mb-4">Listen while commuting</p>
            <div class="content-audio">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <div>
                  <div class="font-medium">Programming Language Evolution</div>
                  <div class="text-sm text-gray-600">Computerphile Podcast • 45 min</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Day (Mixed) Mode -->
          <div class="text-center">
            <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
            <h4 class="text-xl font-semibold text-gray-900 mb-2">Day (Mixed)</h4>
            <p class="text-gray-600 mb-4">Balanced content throughout the day</p>
            <div class="bg-gray-100 p-4 rounded">
              <div class="font-medium mb-2">Latest in Quantum Computing</div>
              <div class="text-sm text-gray-600 mb-2">Scientific American • Text + Video</div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-blue-600 h-2 rounded-full w-3/4"></div>
              </div>
              <div class="text-xs text-gray-500 mt-1">Reading Progress: 75%</div>
            </div>
          </div>

          <!-- Night (Text) Mode -->
          <div class="text-center">
            <div class="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
            </div>
            <h4 class="text-xl font-semibold text-gray-900 mb-2">Night (Text)</h4>
            <p class="text-gray-600 mb-4">Deep reading before bed</p>
            <div class="content-text p-4 bg-gray-100 rounded">
              <div class="font-medium mb-2">A Brief History of Programming</div>
              <div class="text-sm text-gray-600 mb-3">Harvard CS Dept • Academic Paper</div>
              <p class="line-clamp-3">The evolution of programming languages represents one of the most significant intellectual achievements of the 20th century...</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Try New Feature -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 class="text-3xl font-bold text-gray-900 mb-6">"Try New" Discovery</h3>
            <p class="text-lg text-gray-600 mb-6">
              Avoid knowledge stagnation. Our AI suggests related topics to expand your intellectual horizons based on your interests.
            </p>

            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <div class="font-medium">Neuroscience</div>
                  <div class="text-sm text-gray-500">Suggested because you like Programming</div>
                </div>
              </div>

              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </div>
                <div>
                  <div class="font-medium">Systems Architecture</div>
                  <div class="text-sm text-gray-500">Explore the foundations that power modern apps</div>
                </div>
              </div>
            </div>

            <button class="btn btn-primary mt-6">Try New Topics</button>
          </div>

          <div class="text-center">
            <div class="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
              <div class="text-6xl mb-4">🧠</div>
              <h4 class="text-xl font-semibold mb-2">Smart Discovery Engine</h4>
              <p class="text-gray-600">
                Our AI learns from your reading patterns and suggests connections you might have missed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trust & Transparency -->
    <section class="py-16 bg-gray-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h3 class="text-3xl font-bold mb-4">Transparency You Can Trust</h3>
          <p class="text-lg opacity-90">Every piece of content shows its source and reliability score.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h4 class="font-semibold mb-2">Source Attribution</h4>
            <p class="text-sm opacity-75">Know exactly where content comes from</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
            <h4 class="font-semibold mb-2">Reliability Scoring</h4>
            <p class="text-sm opacity-75">Multi-signal trust indicators</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h4 class="font-semibold mb-2">No Censorship</h4>
            <p class="text-sm opacity-75">You decide what to trust</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h4 class="font-semibold mb-2">Diverse Sources</h4>
            <p class="text-sm opacity-75">Academic, media, personal perspectives</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Natural Language Configuration -->
    <section class="py-16 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 class="text-3xl font-bold text-gray-900 mb-6">Tell Us What You Want</h3>
        <p class="text-lg text-gray-600 mb-8">
          Use natural language to configure your content preferences. No checkboxes, just describe what matters to you.
        </p>

        <div class="bg-gray-50 rounded-lg p-6 mb-8">
          <div class="text-left">
            <div class="flex items-center text-sm text-gray-600 mb-3">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Example Filters
            </div>
            <div class="space-y-2 text-sm text-gray-800">
              <p>"Show me programming tutorials that focus on practical applications, not just theory"</p>
              <p>"Exclude political content that seems designed to control behavior or opinions"</p>
              <p>"Include academic papers about how software engineering principles apply to business"</p>
            </div>
          </div>
        </div>

        <button class="btn btn-primary text-lg px-8 py-3">Create Your Filters</button>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-blue-600">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h3 class="text-3xl font-bold mb-6">Ready to Discover Knowledge Differently?</h3>
        <p class="text-xl opacity-90 mb-8">
          Join thousands who are learning without the distraction of social noise.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="btn btn-primary bg-white text-blue-600 hover:bg-gray-50 text-lg px-8 py-3">
            Start Your Journey
          </button>
          <button class="btn btn-outline border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3">
            Learn More
          </button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 class="text-lg font-semibold mb-4">Enti?</h4>
            <p class="text-gray-400">Knowledge discovery without social distraction.</p>
          </div>
          <div>
            <h5 class="font-semibold mb-4">Product</h5>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white">Features</a></li>
              <li><a href="#" class="hover:text-white">Pricing</a></li>
              <li><a href="#" class="hover:text-white">Trust</a></li>
            </ul>
          </div>
          <div>
            <h5 class="font-semibold mb-4">Company</h5>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white">About</a></li>
              <li><a href="#" class="hover:text-white">Blog</a></li>
              <li><a href="#" class="hover:text-white">Careers</a></li>
            </ul>
          </div>
          <div>
            <h5 class="font-semibold mb-4">Support</h5>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white">Help Center</a></li>
              <li><a href="#" class="hover:text-white">Contact Us</a></li>
              <li><a href="#" class="hover:text-white">Privacy</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Enti?. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Page logic would go here in a real implementation
// For the wireframe, this is purely visual
</script>
