<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { getMediaDetails } from '@/services/apiClient';
import MediaList from '@/components/media/MediaList.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import { useWatchlistStore } from '@/stores/watchlistStore';

const route = useRoute();
const details = ref<any>(null);
const isLoading = ref(true);
const watchlistStore = useWatchlistStore();

const fetchDetails = async (type: 'movie' | 'tv', id: string) => {
  isLoading.value = true;
  details.value = null;
  try {
    const res = await getMediaDetails(type, id);
    details.value = res.data;
  } catch (error) {
    console.error("Failed to fetch details:", error);
  } finally {
    isLoading.value = false;
  }
};

const backdropUrl = computed(() => {
  if (details.value && details.value.backdrop_path) {
    return `https://image.tmdb.org/t/p/original${details.value.backdrop_path}`;
  }
  return '';
});

const posterUrl = computed(() => {
  if (details.value && details.value.poster_path) {
    return `https://image.tmdb.org/t/p/w500${details.value.poster_path}`;
  }
  return 'https://via.placeholder.com/500x750?text=No+Image';
});

const officialTrailer = computed(() => {
  if (details.value?.videos?.results) {
    return details.value.videos.results.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube');
  }
  return null;
});

const scrollContainer = ref<HTMLElement | null>(null);

const scroll = (direction: 'left' | 'right') => {
  if (scrollContainer.value) {
    const scrollAmount = scrollContainer.value.clientWidth * 0.8; 
    
    scrollContainer.value.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth', 
    });
  }
};

watch(() => route.params, (newParams) => {
  if (newParams.id) {
    const type = route.path.includes('/movie/') ? 'movie' : 'tv';
    fetchDetails(type, newParams.id as string);
  }
}, { immediate: true });
</script>

<template>
  <main class="min-h-screen bg-gray-900 pt-20">
    <div v-if="isLoading" class="fixed inset-0 flex justify-center items-center bg-gray-900 z-40">
        <LoadingSpinner />
    </div>
    <div v-else-if="details" class="text-white">
      <div class="relative h-[40vh] md:h-[50vh] bg-cover bg-center" :style="{ backgroundImage: `url(${backdropUrl})` }">
        <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
      </div>

      <div class="container mx-auto px-4 md:px-12 pb-12 -mt-32 md:-mt-48 relative">
        <div class="flex flex-col md:flex-row items-start gap-8">
          <div class="flex-shrink-0">
            <img :src="posterUrl" :alt="details.title || details.name" class="w-60 md:w-72 rounded-lg shadow-2xl">
          </div>
          
          <div class="mt-4 md:mt-24">
            <h1 class="text-3xl md:text-5xl font-bold">{{ details.title || details.name }}</h1>
            <div class="flex flex-wrap gap-2 mt-4">
              <span v-for="genre in details.genres" :key="genre.id" class="border border-gray-600 text-xs px-3 py-1 rounded-full">{{ genre.name }}</span>
            </div>
            <p class="mt-4 text-gray-300 max-w-3xl">{{ details.overview }}</p>
          </div>
        </div>
        <div class="mt-4 flex items-center gap-4">
            <button @click="watchlistStore.toggleWatchlist(details)" class="...">
                {{ watchlistStore.isInWatchlist(details.id) ? 'Remove from Watchlist' : 'Add to Watchlist' }}
            </button>
        </div>

        <div class="mt-16">
          <h2 class="text-3xl font-bold mb-6">Casts</h2>
          <div ref="scrollContainer" class="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
            <div v-for="cast in details.credits.cast.slice(0, 15)" :key="cast.id" class="w-32 text-center flex-shrink-0">
              <img v-if="cast.profile_path" :src="`https://image.tmdb.org/t/p/w300${cast.profile_path}`" class="rounded-full w-28 h-28 object-cover mx-auto shadow-lg" :alt="cast.name">
              <div v-else class="rounded-full w-28 h-28 bg-gray-800 mx-auto flex items-center justify-center text-gray-500">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              <p class="mt-3 text-base font-semibold">{{ cast.name }}</p>
              <p class="text-sm text-gray-400">{{ cast.character }}</p>
            </div>
          </div>
        </div>

        <div v-if="officialTrailer" class="mt-8">
            <h2 class="text-3xl font-bold mb-4">Official Trailer</h2>
            <iframe :src="`https://www.youtube.com/embed/${officialTrailer.key}`" class="w-full h-64 md:h-150" frameborder="0" allowfullscreen></iframe>
        </div>
      
        <div v-if="details.similar.results.length" class="mt-16">
          <MediaList title="You Might Also Like" :items="details.similar.results" />
        </div>
      </div>
    </div>
  </main>
  
</template>


<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none; 
  scrollbar-width: none; 
}
</style>