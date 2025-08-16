<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { getPopularMovies, searchMovies as searchMoviesAPI } from '@/services/apiClient';
import MediaCard from '@/components/media/MediaCard.vue';

interface Movie {
  id: number
  title: string
  poster_path: string
  release_date: string
  vote_average: number
  overview: string
}

const movies = ref<Movie[]>([])
const searchQuery = ref('')
const isLoading = ref(false)
const isSearching = ref(false)
const currentPage = ref(1)
const hasMore = ref(true)
const searchTimeout = ref<NodeJS.Timeout | null>(null)

const isSearchMode = computed(() => searchQuery.value.trim().length > 0)
const displayTitle = computed(() => 
  isSearchMode.value 
    ? `Search Results for "${searchQuery.value}"` 
    : 'Popular Movies'
)

const fetchPopularMovies = async (page: number = 1) => {
  try {
    isLoading.value = true
    const response = await getPopularMovies(page)
    const data = response.data
    
    if (page === 1) {
      movies.value = data.results
    } else {
      movies.value = [...movies.value, ...data.results]
    }
    
    hasMore.value = page < data.total_pages && data.results.length > 0
    currentPage.value = page
    
  } catch (error) {
    console.error('Error fetching popular movies:', error)
  } finally {
    isLoading.value = false
  }
}

const searchMovies = async (query: string, page: number = 1) => {
  if (!query.trim()) {
    await fetchPopularMovies()
    return
  }

  try {
    isSearching.value = true
    const response = await searchMoviesAPI(query, page)
    const data = response.data
    
    if (page === 1) {
      movies.value = data.results || []
    } else {
      movies.value = [...movies.value, ...(data.results || [])]
    }
    
    hasMore.value = page < (data.total_pages || 0) && (data.results?.length || 0) > 0
    currentPage.value = page
    
  } catch (error) {
    console.error('Error searching movies:', error)
    movies.value = []
    hasMore.value = false
  } finally {
    isSearching.value = false
  }
}

const loadMoreMovies = async () => {
  if (isLoading.value || isSearching.value) return
  
  const nextPage = currentPage.value + 1
  
  if (isSearchMode.value) {
    await searchMovies(searchQuery.value, nextPage)
  } else {
    await fetchPopularMovies(nextPage)
  }
}

const handleSearch = () => {
  movies.value = []
  currentPage.value = 1
  hasMore.value = true
  
  if (searchQuery.value.trim()) {
    searchMovies(searchQuery.value.trim())
  } else {
    fetchPopularMovies()
  }
}

const clearSearch = () => {
  console.log('Clearing search')
  searchQuery.value = ''
  movies.value = []
  currentPage.value = 1
  hasMore.value = true
  fetchPopularMovies()
}

watch(searchQuery, (newQuery, oldQuery) => {
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
  }

  searchTimeout.value = setTimeout(async () => {
    currentPage.value = 1
    hasMore.value = true
    
    if (newQuery.trim()) {
      console.log('Performing search for:', newQuery.trim())
      await searchMovies(newQuery.trim())
    } else {
      console.log('Loading popular movies')
      await fetchPopularMovies()
    }
  }, 500)
})

onMounted(() => {
  fetchPopularMovies()
})
</script>

<template>
  <main class="min-h-screen pt-20 bg-gray-900">
    <div class="container mx-auto px-4 md:px-8 py-8">
      <h1 class="text-4xl font-bold text-white mb-8 text-center">
        {{ displayTitle }}
      </h1>

      <!-- Search Section -->
      <div class="mb-8">
        <div class="flex flex-col md:flex-row gap-2 max-w-2xl mx-auto">
          <div class="relative flex-1">
            <input 
              v-model="searchQuery"
              type="text"
              placeholder="Search movies... (results appear as you type)"
              class="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
            />
            <!-- Clear button -->
            <button 
              v-if="searchQuery"
              @click="clearSearch"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <button 
            @click="handleSearch"
            :disabled="isSearching"
            class="bg-yellow-500 text-black font-bold px-6 py-3 rounded-lg hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {{ isSearching ? 'Searching...' : 'Search' }}
          </button>
        </div>
        
        <!-- Search Status -->
        <div class="text-center mt-4">
          <p v-if="isSearching" class="text-yellow-400 animate-pulse">
            Searching movies...
          </p>
          <p v-else-if="isSearchMode && movies.length === 0" class="text-gray-400">
            No movies found for "{{ searchQuery }}"
          </p>
          <p v-else-if="isSearchMode && movies.length > 0" class="text-gray-400">
            Found {{ movies.length }} results
          </p>
        </div>
      </div>

      <!-- Movies Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        <div 
          v-for="movie in movies" 
          :key="movie.id"
          class="transform transition-transform duration-300 hover:scale-105"
        >
          <MediaCard :item="movie" />
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!isLoading && !isSearching && movies.length === 0" class="text-center py-12">
        <div class="text-gray-400 text-xl mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v1a1 1 0 01-1 1h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V7H3a1 1 0 01-1-1V5a1 1 0 011-1h4z" />
          </svg>
          No movies found
        </div>
        <p class="text-gray-500">Try adjusting your search terms</p>
      </div>

      <!-- Load More Button -->
      <div v-if="hasMore && !isSearching" class="text-center mt-12">
        <button 
          @click="loadMoreMovies" 
          :disabled="isLoading"
          class="bg-gray-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          <span v-if="isLoading" class="flex items-center justify-center gap-2">
            <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </span>
          <span v-else>Load More</span>
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.grid > div {
  animation: fadeIn 0.3s ease-out;
}
</style>    