import axios from 'axios';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
const FALLBACK_POSTER = 'https://placehold.co/500x750/f8fafc/334155?text=No+Image';
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN?.trim();
const API_KEY = import.meta.env.VITE_TMDB_KEY?.trim();

const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: API_TOKEN
    ? {
        Authorization: `Bearer ${API_TOKEN}`,
      }
    : undefined,
});

function buildParams(params = {}) {
  if (API_TOKEN) {
    return params;
  }

  if (API_KEY) {
    return {
      ...params,
      api_key: API_KEY,
    };
  }

  return params;
}

export const isTmdbConfigured = Boolean(API_TOKEN || API_KEY);

export function getImageUrl(path, size = 'w500') {
  if (!path) {
    return FALLBACK_POSTER;
  }

  return `${IMAGE_BASE_URL}/${size}${path}`;
}

export async function getTrendingMovies() {
  const response = await tmdbApi.get('/trending/movie/day', {
    params: buildParams({
      language: 'en-US',
    }),
  });

  return response.data.results;
}

export async function searchMovies(query) {
  const response = await tmdbApi.get('/search/movie', {
    params: buildParams({
      query,
      include_adult: true,
      language: 'en-US',
      page: 1,
    }),
  });

  return response.data.results;
}

export async function getMovieDetails(movieId) {
  const response = await tmdbApi.get(`/movie/${movieId}`, {
    params: buildParams({
      language: 'en-US',
    }),
  });

  return response.data;
}

export async function getMovieCredits(movieId) {
  const response = await tmdbApi.get(`/movie/${movieId}/credits`, {
    params: buildParams({
      language: 'en-US',
    }),
  });

  return response.data.cast;
}

export async function getMovieReviews(movieId) {
  const response = await tmdbApi.get(`/movie/${movieId}/reviews`, {
    params: buildParams({
      language: 'en-US',
      page: 1,
    }),
  });

  return response.data.results;
}
