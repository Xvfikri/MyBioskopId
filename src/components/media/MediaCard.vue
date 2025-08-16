// src/components/media/MediaCard.vue

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router'; // 1. Impor RouterLink

const props = defineProps({
  item: {
    type: Object,
    required: true,
    default: () => ({ /* ... */ }),
  },
});

const mediaType = computed(() => props.item.title ? 'movie' : 'tv');

const posterUrl = computed(() => {
  if (props.item.poster_path) {
    return `https://image.tmdb.org/t/p/w500${props.item.poster_path}`;
  }
  // Sediakan gambar placeholder jika tidak ada poster
  return 'https://via.placeholder.com/500x750?text=No+Image';
});
</script>

<template>
  <RouterLink :to="`/${mediaType}/${item.id}`">
    <article class="group cursor-pointer transform transition-transform duration-300 hover:scale-105">
      <div class="relative">
        <img :src="posterUrl" :alt="item.title || item.name" class="w-full h-auto object-cover rounded-lg shadow-md" loading="lazy" />
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
  </RouterLink>
</template>