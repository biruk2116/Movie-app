// src/utils/helpers.js
export const getImageUrl = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : "https://via.placeholder.com/500x750";