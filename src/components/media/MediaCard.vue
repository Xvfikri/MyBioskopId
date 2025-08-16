<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router'; 
import { useWatchlistStore } from '@/stores/watchlistStore';

const props = defineProps({
  item: {
    type: Object,
    required: true,
    default: () => ({ /* ... */ }),
  },
});

const watchlistStore = useWatchlistStore(); 

const mediaType = computed(() => {
  if (props.item.title) return 'movie';
  if (props.item.first_air_date) return 'tv';
  return props.item.known_for_department ? 'person' : 'movie';
});

const imageUrl = computed(() => {
  const path = props.item.poster_path || props.item.profile_path;
  if (path) {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }
  return 'https://via.placeholder.com/500x750?text=No+Image';
}); 

const handleToggleWatchlist = (event: Event) => {
  event.preventDefault();
  watchlistStore.toggleWatchlist(props.item);
};

</script>


<template>
  <component :is="mediaType !== 'person' ? RouterLink : 'div'" :to="mediaType !== 'person' ? `/${mediaType}/${item.id}` : null">
    <article class="group ...">
      <div class="relative">
        <img 
          :src="imageUrl" 
          :alt="item.title || item.name"
          class="w-full h-auto object-cover rounded-lg shadow-md"
          loading="lazy"
        />
        <div v-if="item.vote_average" class="absolute top-2 right-2 bg-yellow-500 text-gray-900 text-xs font-bold px-2 py-1 rounded-full">
          ⭐ {{ item.vote_average.toFixed(1) }}
        </div>

        <button 
          @click="handleToggleWatchlist"
          class="absolute top-2 left-2 w-8 h-8 bg-black bg-opacity-60 rounded-full flex justify-center items-center transition-opacity opacity-0 group-hover:opacity-100 hover:bg-yellow-500"
          :class="{ 'opacity-100': watchlistStore.isInWatchlist(item.id) }"
          aria-label="Add to Watchlist"
        >
          <svg v-if="watchlistStore.isInWatchlist(item.id)" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-3.13L5 18V4z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>

      </div>
      <div class="mt-2">
        </div>
    </article>
  </component>
</template>