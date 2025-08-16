<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getPopularPeople } from '@/services/apiClient';
import MediaCard from '@/components/media/MediaCard.vue';

const people = ref<any[]>([]);
const currentPage = ref(1);
const isLoading = ref(false);
const hasMore = ref(true);

const fetchPeople = async (page: number) => {
  if (isLoading.value || !hasMore.value) return;
  isLoading.value = true;
  try {
    const res = await getPopularPeople(page);
    if (res.data.results.length > 0) {
      people.value.push(...res.data.results);
    } else {
      hasMore.value = false;
    }
  } catch (error) {
    console.error("Failed to fetch people:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => { fetchPeople(1); });
</script>
<template>
  <main class="min-h-screen pt-20">
    <div class="container mx-auto px-4 md:px-8 py-8">
      <h1 class="text-4xl font-bold text-white mb-8">Popular People</h1>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        <div v-for="person in people" :key="person.id">
          <MediaCard :item="person" />
        </div>
      </div>
      <div v-if="hasMore" class="text-center mt-12">
        <button @click="() => fetchPeople(++currentPage)" :disabled="isLoading" class="bg-gray-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300">
            <span v-if="isLoading" class="flex items-center justify-center gap-2">
            <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </span>
          {{ isLoading ? 'Loading...' : 'Load More' }}
        </button>
      </div>
    </div>
  </main>
</template>