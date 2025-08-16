import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MoviesView from '../views/MoviesView.vue'; 
import TvView from '../views/TvView.vue'; 
import DetailView from '../views/DetailView.vue';
import WatchlistView from '../views/WatchlistView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/movies',
      name: 'movies',
      component: MoviesView 
    },
    { 
      path: '/tv', 
      name: 'tv', 
      component: TvView 
    },
    { path: '/movie/:id', 
      name: 'movieDetail', 
      component: DetailView 
    },
    { path: '/tv/:id', 
      name: 'tvDetail', 
      component: DetailView 
    },
    { path: '/watchlist', 
      name: 'watchlist', 
      component: WatchlistView 
    },

  ],
  scrollBehavior() {
    return { top: 0 };
  }
})

export default router