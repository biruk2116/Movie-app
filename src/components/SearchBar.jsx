// src/components/SearchBar.jsx
import { useState, useRef, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { useSearch } from "../hooks/useSearch";
import { getPosterUrl } from "../utils/imageHelpers";

export default function SearchBar() {
  const { searchQuery, setSearchQuery, setSelectedMovie } = useApp();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const { results, loading } = useSearch(searchQuery);

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (movie) => {
    setSelectedMovie(movie);
    setShowSuggestions(false);
    setSearchQuery("");
    inputRef.current?.blur();
  };

  const handleClear = () => {
    setSearchQuery("");
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="relative">
        {/* Search Icon */}
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          placeholder="Search movies..."
          className="w-full pl-9 pr-8 py-2 rounded-full bg-gray-800 border border-gray-700 text-white text-sm
            placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500
            transition-all duration-200"
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => searchQuery && setShowSuggestions(true)}
        />
        {/* Clear X */}
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && searchQuery && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-xl
          shadow-2xl shadow-black/60 z-50 overflow-hidden max-h-80 overflow-y-auto">
          {loading && (
            <div className="flex items-center gap-2 px-4 py-3 text-gray-400 text-sm">
              <div className="w-4 h-4 border-2 border-gray-600 border-t-red-500 rounded-full animate-spin" />
              Searching…
            </div>
          )}
          {!loading && results.length === 0 && (
            <div className="px-4 py-3 text-gray-400 text-sm text-center">
              No movies found for &quot;{searchQuery}&quot;
            </div>
          )}
          {!loading && results.slice(0, 8).map((movie) => (
            <button
              key={movie.id}
              onClick={() => handleSelect(movie)}
              className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-gray-800 transition-colors text-left"
            >
              <img
                src={getPosterUrl(movie.poster_path, "w92")}
                alt={movie.title}
                className="w-9 h-14 object-cover rounded flex-shrink-0 bg-gray-700"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/92x138/374151/6b7280?text=?";
                }}
              />
              <div className="min-w-0">
                <p className="text-white text-sm font-medium truncate">{movie.title}</p>
                <p className="text-gray-400 text-xs">
                  {movie.release_date?.slice(0, 4) ?? "N/A"} •{" "}
                  <span className="text-yellow-400">★ {movie.vote_average?.toFixed(1)}</span>
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
