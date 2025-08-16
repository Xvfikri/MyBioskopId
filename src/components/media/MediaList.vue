<script setup lang="ts">
import { ref } from 'vue';
import MediaCard from './MediaCard.vue';
import type { PropType } from 'vue';
import { RouterLink } from 'vue-router';

interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
}

defineProps({
  title: { type: String, required: true },
  items: { type: Array as PropType<MediaItem[]>, required: true },
  viewMoreLink: { type: String, default: '' },
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
</script>

<template>
  <section class="mb-8 relative group">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold text-white">{{ title }}</h2>
      <RouterLink
        v-if="viewMoreLink"
        :to="viewMoreLink"
        class="border border-gray-500 text-gray-300 rounded-full px-4 py-1 text-sm font-semibold hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-all duration-300"
      >
        View more
      </RouterLink>
    </div>

    <div class="relative">
      <div 
        ref="scrollContainer"
        class="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
      >
        <div v-for="item in items" :key="item.id" class="flex-shrink-0 w-48 md:w-56">
          <MediaCard :item="item" />
        </div>
      </div>

      <button 
        @click="scroll('left')"
        class="absolute top-1/2 -translate-y-1/2 left-0 w-12 h-full bg-gradient-to-r from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button 
        @click="scroll('right')"
        class="absolute top-1/2 -translate-y-1/2 right-0 w-12 h-full bg-gradient-to-l from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </section>
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