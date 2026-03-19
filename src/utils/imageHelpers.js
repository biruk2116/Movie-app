// src/utils/imageHelpers.js

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

/**
 * Returns a full TMDB poster URL.
 * @param {string|null} path  - e.g. "/abc123.jpg"
 * @param {string} size       - e.g. "w500" | "w342" | "original"
 */
export function getPosterUrl(path, size = "w500") {
  if (!path) return "/placeholder-poster.png";
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

/**
 * Returns a full TMDB backdrop URL.
 * @param {string|null} path
 * @param {string} size
 */
export function getBackdropUrl(path, size = "w1280") {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

/**
 * Formats a date string to a readable year.
 * @param {string} dateString  - e.g. "2023-07-14"
 */
export function getYear(dateString) {
  if (!dateString) return "N/A";
  return new Date(dateString).getFullYear();
}

/**
 * Formats a full date string to readable format.
 * @param {string} dateString
 */
export function formatDate(dateString) {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
