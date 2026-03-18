const API_KEY = "55ce5f7cd342c3c0655f868d340bb2e9";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async () => {
  const res = await fetch(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
  );
  return res.json();
};

export const searchMovies = async (query) => {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );
  return res.json();
};