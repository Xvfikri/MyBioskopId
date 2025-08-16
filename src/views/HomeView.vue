<script setup lang="ts">
import { ref, onMounted } from 'vue';
import MediaList from '@/components/media/MediaList.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';

import { 
  getPopularMovies, 
  getTopRatedMovies, 
  getUpcomingMovies 
} from '@/services/apiClient';

const popularMovies = ref([]);
const topRatedMovies = ref([]);
const upcomingMovies = ref([]);
const isLoading = ref(true); 

const fetchAllMovies = async () => {
  try {
    const [popularRes, topRatedRes, upcomingRes] = await Promise.all([
      getPopularMovies(),
      getTopRatedMovies(),
      getUpcomingMovies()
    ]);

    popularMovies.value = popularRes.data.results;
    topRatedMovies.value = topRatedRes.data.results;
    upcomingMovies.value = upcomingRes.data.results;
    
  } catch (error) {
    console.error("Gagal mengambil data film:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchAllMovies();
});
</script>

<template>
  <div v-if="isLoading" class="fixed inset-0 flex justify-center items-center bg-gray-900 z-40">
    <LoadingSpinner />
  </div>

  <main class="p-4 md:p-8 bg-gray-900 min-h-screen pt-20">
    <div>
      <MediaList title="Popular Movies" :items="popularMovies" />
      <MediaList title="Top Rated Movies" :items="topRatedMovies" />
      <MediaList title="Upcoming Movies" :items="upcomingMovies" />
    </div>
  </main>
</template>