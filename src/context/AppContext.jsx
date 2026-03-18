// src/context/AppContext.jsx
import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (movie) => {
    setFavorites((prev) =>
      prev.some((m) => m.id === movie.id)
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie]
    );
  };

  return (
    <AppContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </AppContext.Provider>
  );
};