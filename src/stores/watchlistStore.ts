import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

interface MediaItem {
  id: number;
  [key: string]: any;
}

export const useWatchlistStore = defineStore('watchlist', () => {
  const watchlist = ref<MediaItem[]>(JSON.parse(localStorage.getItem('watchlist') || '[]'));

  const isInWatchlist = computed(() => {
    return (itemId: number) => watchlist.value.some(item => item.id === itemId);
  });

  const saveToLocalStorage = () => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist.value));
  };

  const addToWatchlist = (item: MediaItem) => {
    if (!isInWatchlist.value(item.id)) {
      watchlist.value.push(item);
      saveToLocalStorage();
    }
  };

  const removeFromWatchlist = (itemId: number) => {
    watchlist.value = watchlist.value.filter(item => item.id !== itemId);
    saveToLocalStorage();
  };

  const toggleWatchlist = (item: MediaItem) => {
    if (isInWatchlist.value(item.id)) {
      removeFromWatchlist(item.id);
    } else {
      addToWatchlist(item);
    }
  };

  return {
    watchlist,
    isInWatchlist,
    addToWatchlist,
    removeFromWatchlist,
    toggleWatchlist,
  };
});