<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref } from 'vue';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Movies', path: '/movies' },
  { name: 'Series', path: '/tv' },
];

const isMobileMenuOpen = ref(false);
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md shadow-lg">
    <div class="container mx-auto px-4 md:px-8">
      <div class="flex items-center justify-between h-20">
        
        <!-- Logo -->
        <RouterLink to="/" class="text-white text-2xl font-bold hover:text-yellow-400 transition-colors">
          <span class="text-yellow-400">MyBioskop</span><span class="text-white">Id</span>
        </RouterLink>

        <!-- Desktop Menu -->
        <ul class="hidden md:flex items-center space-x-8">
          <li v-for="link in navLinks" :key="link.name">
            <RouterLink 
              :to="link.path" 
              class="text-gray-300 hover:text-yellow-400 transition-colors duration-300 text-lg font-medium"
              active-class="text-yellow-400 font-semibold"
            >
              {{ link.name }}
            </RouterLink>
          </li>
        </ul>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <button 
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="text-white p-2 rounded-md hover:text-yellow-400 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

      </div>

      <!-- Mobile Menu -->
      <div v-if="isMobileMenuOpen" class="md:hidden bg-black/80 backdrop-blur-md rounded-lg mt-2 mb-4">
        <ul class="py-4 space-y-2">
          <li v-for="link in navLinks" :key="link.name">
            <RouterLink 
              :to="link.path" 
              @click="isMobileMenuOpen = false"
              class="block px-6 py-3 text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/10 transition-all duration-300 text-lg"
              active-class="text-yellow-400 font-semibold bg-yellow-400/10"
            >
              {{ link.name }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Fallback styles jika Tailwind tidak load */
nav {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(12px);
}
</style>