<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import MediaList from '@/components/media/MediaList.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import HeroSection from '@/components/layout/HeroSection.vue';
import { 
  getPopularMovies, 
  getTopRatedMovies, 
  getPopularTvShows,
  getTopRatedTvShows,
  getUpcomingMovies,
  getNowPlayingMovies,
  getOnTheAirTvShows,
  getAiringTodayTvShows,
  getPopularPeople
} from '@/services/apiClient';

// Tambahkan state untuk semua data baru
const popularMovies = ref<any[]>([]);
const topRatedMovies = ref<any[]>([]);
const popularTvShows = ref<any[]>([]);
const topRatedTvShows = ref<any[]>([]);
const upcomingMovies = ref<any[]>([]);
const nowPlayingMovies = ref<any[]>([]);
const onTheAirTvShows = ref<any[]>([]);
const airingTodayTvShows = ref<any[]>([]);
const popularPeople = ref<any[]>([]);
const isLoading = ref(true);

const currentHeroIndex = ref(0);
let heroInterval: number;
const currentHeroItem = computed(() => {
  if (nowPlayingMovies.value.length > 0) {
    return nowPlayingMovies.value[currentHeroIndex.value];
  }
  return null;
});

const fetchAllContent = async () => {
  try {
    const [
      popularMovieRes, topRatedMovieRes, popularTvRes, topRatedTvRes,
      upcomingRes, nowPlayingRes, onTheAirRes, airingTodayRes, popularPeopleRes
    ] = await Promise.all([
      getPopularMovies(), getTopRatedMovies(), getPopularTvShows(), getTopRatedTvShows(),
      getUpcomingMovies(), getNowPlayingMovies(), getOnTheAirTvShows(), getAiringTodayTvShows(), getPopularPeople()
    ]);

    popularMovies.value = popularMovieRes.data?.results || [];
    topRatedMovies.value = topRatedMovieRes.data?.results || [];
    popularTvShows.value = popularTvRes.data?.results || [];
    topRatedTvShows.value = topRatedTvRes.data?.results || [];
    upcomingMovies.value = upcomingRes.data?.results || [];
    nowPlayingMovies.value = nowPlayingRes.data?.results || [];
    onTheAirTvShows.value = onTheAirRes.data?.results || [];
    airingTodayTvShows.value = airingTodayRes.data?.results || [];
    popularPeople.value = popularPeopleRes.data?.results || [];

    if (nowPlayingMovies.value.length > 0) {
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
    currentHeroIndex.value = (currentHeroIndex.value + 1) % nowPlayingMovies.value.length;
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
      <MediaList title="Now Playing Movies" :items="nowPlayingMovies" />
      <MediaList title="Upcoming Movies" :items="upcomingMovies" />
      <MediaList title="Top Rated Movies" :items="topRatedMovies" />
      <MediaList title="Popular TV Shows" :items="popularTvShows" view-more-link="/tv" />
      <MediaList title="Airing Today TV Shows" :items="airingTodayTvShows" />
      <MediaList title="On The Air TV Shows" :items="onTheAirTvShows" />
      <MediaList title="Top Rated TV Shows" :items="topRatedTvShows" />
      <MediaList title="Popular People" :items="popularPeople" view-more-link="/people" />
    </div>
  </main>
</template>