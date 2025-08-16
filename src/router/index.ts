import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MoviesView from '../views/MoviesView.vue'; 
import TvView from '../views/TvView.vue'; 
import DetailView from '../views/DetailView.vue';
import WatchlistView from '../views/WatchlistView.vue';
import PersonDetailView from '../views/PersonDetailView.vue'; 
import PeopleView from '../views/PeopleView.vue';


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
    { path: '/people', name: 'people', component: PeopleView },
    { path: '/person/:id', name: 'personDetail', component: PersonDetailView }

  ],
  scrollBehavior() {
    return { top: 0 };
  }
})

export default router