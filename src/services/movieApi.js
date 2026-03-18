// src/services/movieApi.js
const API_KEY = "55ce5f7cd342c3c0655f868d340bb2e9";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async () => {
  try {
    const res = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
    const data = await res.json();
    return data.results || [];
  } catch {
    return [];
  }
};

export const searchMovies = async (query) => {
  try {
    const res = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    const data = await res.json();
    return data.results || [];
  } catch {
    return [];
  }
};

export const fetchMovieVideos = async (movieId) => {
  try {
    const res = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
    const data = await res.json();
    return data.results || [];
  } catch {
    return [];
  }
};