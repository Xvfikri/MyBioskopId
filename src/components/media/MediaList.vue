// src/components/media/MediaList.vue

<script setup lang="ts">
import MediaCard from './MediaCard.vue';
import type { PropType } from 'vue';

// Definisikan tipe data untuk item media agar lebih aman dengan TypeScript
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
  title: {
    type: String,
    required: true,
  },
  items: {
    type: Array as PropType<MediaItem[]>,
    required: true,
  },
});
</script>

<template>
  <section class="mb-8">
    <h2 class="text-2xl font-bold text-white mb-4">{{ title }}</h2>
    <div class="flex overflow-x-auto space-x-4 pb-4">
      <div v-for="item in items" :key="item.id" class="flex-shrink-0 w-48">
        <MediaCard :item="item" />
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Kustomisasi scrollbar agar lebih menarik (opsional) */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}
.overflow-x-auto::-webkit-scrollbar-thumb {
  background-color: #4a5568; /* gray-700 */
  border-radius: 4px;
}
.overflow-x-auto::-webkit-scrollbar-track {
  background-color: #2d3748; /* gray-800 */
}
</style>