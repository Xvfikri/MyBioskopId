<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import MediaList from '@/components/media/MediaList.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import HeroSection from '@/components/layout/HeroSection.vue';

import { 
  getPopularMovies, 
  getTopRatedMovies, 
  getPopularTvShows,
  getTopRatedTvShows
} from '@/services/apiClient';

const popularMovies = ref<any[]>([]);
const topRatedMovies = ref<any[]>([]);
const popularTvShows = ref<any[]>([]);
const topRatedTvShows = ref<any[]>([]);
const isLoading = ref(true);

const currentHeroIndex = ref(0);
let heroInterval: number;

const currentHeroItem = computed(() => {
  if (popularMovies.value.length > 0) {
    const item = popularMovies.value[currentHeroIndex.value];
    return item;
  }
  return null;
});

const fetchAllContent = async () => {
  try {
    const [
      popularMovieRes, 
      topRatedMovieRes, 
      popularTvRes, 
      topRatedTvRes
    ] = await Promise.all([
      getPopularMovies(1), 
      getTopRatedMovies(),
      getPopularTvShows(),
      getTopRatedTvShows()
    ]);

    popularMovies.value = popularMovieRes.data?.results || [];
    topRatedMovies.value = topRatedMovieRes.data?.results || [];
    popularTvShows.value = popularTvRes.data?.results || [];
    topRatedTvShows.value = topRatedTvRes.data?.results || [];

    if (popularMovies.value.length > 0) {
      startHeroInterval();
    }
  } catch (error) {
    console.error("Gagal mengambil data:", error);
  } finally {
    isLoading.value = false;
  }
};

const startHeroInterval = () => {
  heroInterval = setInterval(() => {
    const nextIndex = (currentHeroIndex.value + 1) % popularMovies.value.length;
    currentHeroIndex.value = nextIndex;
  }, 7000); 
};

onMounted(() => {
  fetchAllContent();
});

onUnmounted(() => {
  clearInterval(heroInterval);
});
</script>

<template>
  <div v-if="isLoading" class="fixed inset-0 flex justify-center items-center bg-gray-900 z-40">
    <LoadingSpinner />
  </div>

  <main class="bg-gray-900 min-h-screen">
    <HeroSection v-if="currentHeroItem" :item="currentHeroItem" />

    <div class="px-4 md:px-10 lg:px-12">
      <MediaList title="Popular Movies" :items="popularMovies" view-more-link="/movies" />
      <MediaList title="Top Rated Movies" :items="topRatedMovies" />
      <MediaList title="Popular TV Shows" :items="popularTvShows" view-more-link="/tv" />
      <MediaList title="Top Rated TV Shows" :items="topRatedTvShows" />
    </div>
  </main>
</template>