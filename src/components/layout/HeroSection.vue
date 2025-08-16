<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue';
import type { PropType } from 'vue';
import VideoModal from '@/components/common/VideoModal.vue';
import { RouterLink } from 'vue-router';
import { getMediaDetails } from '@/services/apiClient';

interface HeroItem {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  videos?: { results: { key: string, type: string, site: string }[] };
}

const props = defineProps({
  item: { type: Object as PropType<HeroItem>, required: true },
});

const isModalOpen = ref(false);
const videoKey = ref<string | null>(null);
const isLoadingVideo = ref(false);

const fetchVideoData = async () => {
  if (!props.item?.id) return;
  
  isLoadingVideo.value = true;
  try {
    const response = await getMediaDetails('movie', props.item.id.toString());
    const videos = response.data.videos?.results;
    
    if (videos && videos.length > 0) {
      const trailer = videos.find(v => 
        v.type === 'Trailer' && v.site === 'YouTube'
      );
      videoKey.value = trailer ? trailer.key : null;
      console.log('Fetched video key:', videoKey.value);
    }
  } catch (error) {
    console.error('Error fetching video data:', error);
    videoKey.value = null;
  } finally {
    isLoadingVideo.value = false;
  }
};

watch(() => props.item?.id, () => {
  videoKey.value = null; // Reset
  fetchVideoData();
});

onMounted(() => {
  console.log('Hero item data:', props.item);
  
  // Check if videos are already available
  if (props.item?.videos?.results) {
    const trailer = props.item.videos.results.find(v => 
      v.type === 'Trailer' && v.site === 'YouTube'
    );
    videoKey.value = trailer ? trailer.key : null;
    console.log('Videos from props:', videoKey.value);
  } else {
    // Fetch videos separately
    fetchVideoData();
  }
});

const backdropUrl = computed(() => 
  `https://image.tmdb.org/t/p/original${props.item?.backdrop_path}`
);

const truncatedOverview = computed(() => {
  if (props.item && props.item.overview) {
    return props.item.overview.length > 200
      ? props.item.overview.substring(0, 200) + '...'
      : props.item.overview;
  }
  return '';
});

const hasTrailer = computed(() => !!videoKey.value);
</script>

<template>
  <div v-if="item" class="relative h-[60vh] md:h-[80vh] bg-cover bg-center bg-no-repeat" 
       :style="{ backgroundImage: `url(${backdropUrl})` }">
    <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>

    <div class="relative z-10 flex flex-col justify-end h-full text-white container mx-auto px-4 md:px-12 pb-10 md:pb-20">
      <h1 class="text-3xl md:text-5xl font-bold mb-4">{{ item.title }}</h1>
      <p class="text-base md:text-lg max-w-2xl mb-6">{{ truncatedOverview }}</p>
      
      <div class="flex space-x-4">
        <button 
          v-if="hasTrailer && !isLoadingVideo" 
          @click="isModalOpen = true" 
          class="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-lg transition-colors">
          ▶ Watch Trailer
        </button>
        
        <!-- Loading state -->
        <button 
          v-else-if="isLoadingVideo" 
          disabled
          class="bg-gray-500 text-white font-bold py-2 px-6 rounded-lg opacity-50">
          Loading...
        </button>
        
        <!-- No trailer available -->
        <button 
          v-else 
          disabled
          class="bg-red-500 text-white font-bold py-2 px-6 rounded-lg opacity-50">
          No Trailer Available
        </button>
        
        <RouterLink 
          :to="`/movie/${item.id}`" 
          class="bg-gray-700/50 hover:bg-gray-700 backdrop-blur-sm text-white font-bold py-2 px-6 rounded-lg transition-colors">
          More Info
        </RouterLink>
      </div>
    </div>
  </div>
  
  <VideoModal 
    :is-open="isModalOpen" 
    :video-key="videoKey" 
    @close="isModalOpen = false" />
</template>