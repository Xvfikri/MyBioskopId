<script setup lang="ts">
import { computed } from 'vue';
import { useWatchlistStore } from '@/stores/watchlistStore';
import MediaCard from '@/components/media/MediaCard.vue';

const watchlistStore = useWatchlistStore();
const watchlistItems = computed(() => watchlistStore.watchlist);
</script>

<template>
  <main class="min-h-screen pt-20">
    <div class="container mx-auto px-4 md:px-8 py-8">
      <h1 class="text-4xl font-bold text-white mb-8">My Watchlist</h1>

      <div v-if="watchlistItems.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        <div v-for="item in watchlistItems" :key="item.id">
          <MediaCard :item="item" />
        </div>
      </div>

      <div v-else class="text-center text-gray-400 mt-12">
        <p class="text-2xl">Your watchlist is empty.</p>
        <p class="mt-2">Add movies and TV shows to see them here.</p>
      </div>
    </div>
  </main>
</template>