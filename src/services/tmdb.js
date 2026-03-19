// src/services/tmdb.js

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

if (!API_KEY) {
  console.warn(
    "[TMDB] VITE_TMDB_API_KEY is not set. Create a .env file with your TMDB API key."
  );
}

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

async function tmdbFetch(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set("api_key", API_KEY);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`TMDB API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function getPopularMovies(page = 1) {
  return tmdbFetch("/movie/popular", { page });
}

export async function getTopRatedMovies(page = 1) {
  return tmdbFetch("/movie/top_rated", { page });
}

export async function searchMovies(query, page = 1) {
  if (!query.trim()) return { results: [], total_pages: 0, total_results: 0 };
  return tmdbFetch("/search/movie", { query, page, include_adult: false });
}

export async function getMovieVideos(movieId) {
  return tmdbFetch(`/movie/${movieId}/videos`);
}

export async function getGenres() {
  return tmdbFetch("/genre/movie/list");
}

export async function getMoviesByGenre(genreId, page = 1) {
  return tmdbFetch("/discover/movie", {
    with_genres: genreId,
    sort_by: "popularity.desc",
    page,
  });
}
