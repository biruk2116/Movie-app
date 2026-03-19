// src/pages/Home.jsx
import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { useMovies } from "../hooks/useMovies";
import { useSearch } from "../hooks/useSearch";
import { getMoviesByGenre } from "../services/tmdb";
import Navbar from "../components/Navbar";
import GenreFilter from "../components/GenreFilter";
import MovieGrid from "../components/MovieGrid";
import MovieModal from "../components/MovieModal";

const TABS = [
  { id: "popular", label: "🔥 Popular" },
  { id: "top_rated", label: "⭐ Top Rated" },
];

export default function Home() {
  const { searchQuery, selectedGenre } = useApp();
  const [activeTab, setActiveTab] = useState("popular");

  // Main tab movies (popular / top rated)
  const { movies, loading, error, loadMore, hasMore } = useMovies(activeTab);

  // Search results (debounced)
  const { results: searchResults, loading: searchLoading, error: searchError } = useSearch(searchQuery);

  // Genre-filtered movies
  const [genreMovies, setGenreMovies] = useState([]);
  const [genreLoading, setGenreLoading] = useState(false);
  const [genreError, setGenreError] = useState(null);

  useEffect(() => {
    if (!selectedGenre) {
      setGenreMovies([]);
      return;
    }
    let cancelled = false;
    setGenreLoading(true);
    setGenreError(null);
    getMoviesByGenre(selectedGenre)
      .then((data) => { if (!cancelled) setGenreMovies(data.results || []); })
      .catch((err) => { if (!cancelled) setGenreError(err.message); })
      .finally(() => { if (!cancelled) setGenreLoading(false); });
    return () => { cancelled = true; };
  }, [selectedGenre]);

  // Priority: search > genre > tab
  const isSearching = searchQuery.trim().length > 0;
  const isGenreFiltered = !!selectedGenre && !isSearching;

  const displayMovies  = isSearching ? searchResults : isGenreFiltered ? genreMovies : movies;
  const displayLoading = isSearching ? searchLoading  : isGenreFiltered ? genreLoading : loading;
  const displayError   = isSearching ? searchError    : isGenreFiltered ? genreError   : error;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
        {/* Tabs — hidden while searching */}
        {!isSearching && (
          <div className="flex gap-2 mb-6">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 ${
                  activeTab === tab.id && !isGenreFiltered
                    ? "bg-red-600 text-white shadow-lg shadow-red-900/40"
                    : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 border border-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Genre Filter — hidden while searching */}
        {!isSearching && (
          <div className="mb-8">
            <GenreFilter />
          </div>
        )}

        {/* Section heading */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">
            {isSearching ? (
              <>
                Results for{" "}
                <span className="text-red-400">&ldquo;{searchQuery}&rdquo;</span>
              </>
            ) : isGenreFiltered ? (
              "Genre Movies"
            ) : activeTab === "popular" ? (
              "Popular Movies"
            ) : (
              "Top Rated Movies"
            )}
          </h1>
          {!isSearching && !isGenreFiltered && !loading && (
            <span className="text-gray-500 text-sm">{movies.length} movies loaded</span>
          )}
        </div>

        {/* Movie Grid */}
        <MovieGrid
          movies={displayMovies}
          loading={displayLoading}
          error={displayError}
          searchQuery={isSearching ? searchQuery : ""}
          onLoadMore={!isSearching && !isGenreFiltered ? loadMore : undefined}
          hasMore={!isSearching && !isGenreFiltered ? hasMore : false}
        />
      </main>

      {/* Movie Detail Modal */}
      <MovieModal />
    </div>
  );
}