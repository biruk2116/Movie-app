// src/hooks/useGenres.js
import { useState, useEffect } from "react";
import { getGenres } from "../services/tmdb";

export function useGenres() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getGenres()
      .then((data) => {
        if (!cancelled) setGenres(data.genres || []);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { genres, loading, error };
}
