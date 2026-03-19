// src/hooks/useSearch.js
import { useState, useEffect, useRef } from "react";
import { searchMovies } from "../services/tmdb";

export function useSearch(query) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      let cancelled = false;

      searchMovies(query)
        .then((data) => {
          if (!cancelled) setResults(data.results || []);
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
    }, 300);

    return () => clearTimeout(timerRef.current);
  }, [query]);

  return { results, loading, error };
}
