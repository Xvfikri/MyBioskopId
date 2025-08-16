<script setup lang="ts">
defineProps<{
  isOpen: boolean;
  videoKey: string | null;
}>();
const emit = defineEmits(['close']);
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-opacity-80 backdrop-blur-xs flex justify-center items-center z-50 p-4"
      @click.self="emit('close')"
    >
      <div class="relative w-full max-w-4xl rounded-lg shadow-xl" @click.stop>
        <button
          @click="emit('close')"
          class="absolute -top-4 -right-4 text-white bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center text-2xl z-10 hover:bg-yellow-500 hover:text-black transition-colors"
          aria-label="Close video player"
        >
          &times;
        </button>
        
        <div class="aspect-video">
          <iframe
            v-if="videoKey"
            :src="`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`"
            class="w-full h-full rounded-lg"
            frameborder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowfullscreen>
          </iframe>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>