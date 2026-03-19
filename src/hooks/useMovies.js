// src/hooks/useMovies.js
import { useState, useEffect } from "react";
import { getPopularMovies, getTopRatedMovies } from "../services/tmdb";

export function useMovies(tab) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setPage(1);
    setMovies([]);
  }, [tab]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const fetcher = tab === "top_rated" ? getTopRatedMovies : getPopularMovies;

    fetcher(page)
      .then((data) => {
        if (cancelled) return;
        setMovies((prev) =>
          page === 1 ? data.results : [...prev, ...data.results]
        );
        setTotalPages(data.total_pages);
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
  }, [tab, page]);

  const loadMore = () => {
    if (page < totalPages) setPage((p) => p + 1);
  };

  return { movies, loading, error, loadMore, hasMore: page < totalPages };
}
