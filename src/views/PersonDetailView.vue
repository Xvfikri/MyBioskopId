<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { getPersonDetails } from '@/services/apiClient';
import MediaList from '@/components/media/MediaList.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';

const route = useRoute();
const details = ref<any>(null);
const isLoading = ref(true);

const fetchPersonDetails = async (id: string) => {
  isLoading.value = true;
  try {
    const res = await getPersonDetails(id);
    details.value = res.data;
  } finally {
    isLoading.value = false;
  }
};

const profileUrl = computed(() => `https://image.tmdb.org/t/p/h632${details.value?.profile_path}`);
const knownForCredits = computed(() => {
  return details.value?.combined_credits?.cast
    .sort((a: any, b: any) => b.popularity - a.popularity)
    .slice(0, 20) || [];
});

watch(() => route.params.id, (newId) => {
  if (newId) fetchPersonDetails(newId as string);
}, { immediate: true });
</script>
<template>
  <main class="min-h-screen bg-gray-900 pt-30">
    <div v-if="isLoading" class="fixed inset-0 flex justify-center items-center bg-gray-900 z-40">
        <LoadingSpinner />
    </div>    
    <div v-else-if="details" class="container mx-auto px-4 md:px-12 pb-12 text-white">
      <div class="flex flex-col md:flex-row items-start gap-8">
        <img :src="profileUrl" :alt="details.name" class="w-72 rounded-lg shadow-2xl flex-shrink-0">
        <div>
          <h1 class="text-5xl font-bold">{{ details.name }}</h1>
          <p class="text-lg text-gray-400 mt-2">{{ details.known_for_department }}</p>
          <h3 class="text-2xl font-semibold mt-8 mb-2">Biography</h3>
          <p class="text-gray-300">{{ details.biography || "No biography available." }}</p>
        </div>
      </div>
      <div class="mt-12" v-if="knownForCredits.length">
        <MediaList title="Known For" :items="knownForCredits" />
      </div>
    </div>
  </main>
</template>