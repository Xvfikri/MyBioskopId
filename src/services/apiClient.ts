import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  }
});

export const getTopRatedMovies = () => apiClient.get('/movie/top_rated');
export const getUpcomingMovies = () => apiClient.get('/movie/upcoming');
export const getNowPlayingMovies = () => apiClient.get('/movie/now_playing');
export const getPopularMovies = (page = 1) => 
  apiClient.get('/movie/popular', { params: { page } });


// --- Endpoint untuk TV Shows ---
export const getPopularTvShows = (page = 1) => 
  apiClient.get('/tv/popular', { params: { page } });
export const getTopRatedTvShows = () => apiClient.get('/tv/top_rated');
export const getOnTheAirTvShows = () => apiClient.get('/tv/on_the_air');
export const getAiringTodayTvShows = () => apiClient.get('/tv/airing_today');

// --- Endpoint untuk People ---
export const getPopularPeople = () => apiClient.get('/person/popular');

export const searchMovies = (query: string, page = 1) => 
  apiClient.get('/search/movie', { params: { query, page } });

export const searchTvShows = (query: string, page = 1) => 
  apiClient.get('/search/tv', { params: { query, page } });


export default apiClient;