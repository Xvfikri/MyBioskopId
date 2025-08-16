<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from '@/components/layout/Navbar.vue';
</script>

<template>
  <div class="bg-gray-900">
    <Navbar />
    
    <RouterView />

    </div>
</template>