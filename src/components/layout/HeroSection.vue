// src/components/layout/HeroSection.vue

<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';

interface HeroItem {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
}

const props = defineProps({
  item: {
    type: Object as PropType<HeroItem>,
    required: true,
  },
});

const backdropUrl = computed(() => {
  if (props.item && props.item.backdrop_path) {
    return `https://image.tmdb.org/t/p/original${props.item.backdrop_path}`;
  }
  return '';
});

const truncatedOverview = computed(() => {
  if (props.item && props.item.overview) {
    return props.item.overview.length > 200
      ? props.item.overview.substring(0, 200) + '...'
      : props.item.overview;
  }
  return '';
});
</script>

<template>
  <div
    v-if="item"
    class="relative h-[60vh] md:h-[80vh] bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
    :style="{ backgroundImage: `url(${backdropUrl})` }"
  >
    <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>

    <div class="relative z-10 flex flex-col justify-end h-full text-white container mx-auto px-4 md:px-8 pb-10 md:pb-20">
      <h1 class="text-3xl md:text-5xl font-bold mb-4">{{ item.title }}</h1>
      <p class="text-base md:text-lg max-w-2xl mb-6">{{ truncatedOverview }}</p>
      <div class="flex space-x-4">
        <button class="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-lg transition-colors">
          ▶ Watch Now
        </button>
        <button class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors">
          More Info
        </button>
      </div>
    </div>
  </div>
</template>