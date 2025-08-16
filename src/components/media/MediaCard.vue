// src/components/media/MediaCard.vue

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
    default: () => ({
      id: 0,
      title: 'Default Title',
      poster_path: '',
      vote_average: 0,
      release_date: '',
    }),
  },
});

const posterUrl = computed(() => {
  if (props.item.poster_path) {
    return `https://image.tmdb.org/t/p/w500${props.item.poster_path}`;
  }
});
</script>

<template>
  <article class="group cursor-pointer transform transition-transform duration-300 hover:scale-105">
    <div class="relative">
      <img 
        :src="posterUrl" 
        :alt="item.title"
        class="w-full h-auto object-cover rounded-lg shadow-md"
        loading="lazy"
      />
      <div v-if="item.vote_average" class="absolute top-2 right-2 bg-yellow-500 text-gray-900 text-xs font-bold px-2 py-1 rounded-full">
        ⭐ {{ item.vote_average.toFixed(1) }}
      </div>
    </div>
    <div class="mt-2">
      <h3 class="text-white text-base font-semibold truncate group-hover:text-yellow-400">
        {{ item.title || item.name }}
      </h3>
      <p class="text-gray-400 text-sm">
        {{ (item.release_date || item.first_air_date)?.substring(0, 4) }}
      </p>
    </div>
  </article>
</template>

<style scoped>
</style>