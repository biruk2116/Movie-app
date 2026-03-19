// src/context/AppContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AppContext = createContext(null);

function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }) {
  const [favorites, setFavorites] = useState(() =>
    loadFromStorage("movieapp_favorites", [])
  );
  const [userRatings, setUserRatings] = useState(() =>
    loadFromStorage("movieapp_ratings", {})
  );
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Persist favorites
  useEffect(() => {
    localStorage.setItem("movieapp_favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Persist user ratings
  useEffect(() => {
    localStorage.setItem("movieapp_ratings", JSON.stringify(userRatings));
  }, [userRatings]);

  const isFavorite = useCallback(
    (movieId) => favorites.some((m) => m.id === movieId),
    [favorites]
  );

  const toggleFavorite = useCallback(
    (movie) => {
      setFavorites((prev) =>
        prev.some((m) => m.id === movie.id)
          ? prev.filter((m) => m.id !== movie.id)
          : [...prev, movie]
      );
    },
    []
  );

  const setUserRating = useCallback((movieId, rating) => {
    setUserRatings((prev) => ({ ...prev, [movieId]: rating }));
  }, []);

  const getUserRating = useCallback(
    (movieId) => userRatings[movieId] || 0,
    [userRatings]
  );

  return (
    <AppContext.Provider
      value={{
        favorites,
        userRatings,
        selectedGenre,
        setSelectedGenre,
        selectedMovie,
        setSelectedMovie,
        searchQuery,
        setSearchQuery,
        isFavorite,
        toggleFavorite,
        setUserRating,
        getUserRating,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}