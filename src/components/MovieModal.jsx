// src/components/MovieModal.jsx
import { useEffect, useState, useCallback } from "react";
import { useApp } from "../context/AppContext";
import { getMovieVideos } from "../services/tmdb";
import { getPosterUrl, getBackdropUrl, formatDate } from "../utils/imageHelpers";
import StarRating from "./StarRating";

export default function MovieModal() {
  const { selectedMovie, setSelectedMovie, isFavorite, toggleFavorite } = useApp();
  const [trailer, setTrailer] = useState(null);
  const [loadingTrailer, setLoadingTrailer] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  const close = useCallback(() => {
    setSelectedMovie(null);
    setTrailer(null);
    setShowTrailer(false);
  }, [setSelectedMovie]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [close]);

  // Prevent body scroll
  useEffect(() => {
    if (selectedMovie) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedMovie]);

  // Fetch trailer
  useEffect(() => {
    if (!selectedMovie) return;
    setLoadingTrailer(true);
    setTrailer(null);
    setShowTrailer(false);

    getMovieVideos(selectedMovie.id)
      .then((data) => {
        const yt = data.results?.find(
          (v) =>
            v.site === "YouTube" &&
            (v.type === "Trailer" || v.type === "Teaser")
        );
        setTrailer(yt || null);
      })
      .catch(() => setTrailer(null))
      .finally(() => setLoadingTrailer(false));
  }, [selectedMovie]);

  if (!selectedMovie) return null;

  const fav = isFavorite(selectedMovie.id);
  const backdrop = getBackdropUrl(selectedMovie.backdrop_path);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div
        className="relative bg-gray-900 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto
          shadow-2xl shadow-black/80 border border-gray-800 modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Backdrop Header */}
        {backdrop && (
          <div className="relative h-48 sm:h-64 overflow-hidden rounded-t-2xl flex-shrink-0">
            <img
              src={backdrop}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={close}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm
            flex items-center justify-center text-gray-300 hover:text-white hover:bg-red-600 transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Body */}
        <div className="flex gap-5 p-5 -mt-16 relative">
          {/* Poster */}
          <div className="flex-shrink-0 w-32 sm:w-44">
            <img
              src={getPosterUrl(selectedMovie.poster_path, "w342")}
              alt={selectedMovie.title}
              className="w-full rounded-xl shadow-xl border-2 border-gray-700"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/342x513/1f2937/6b7280?text=No+Image";
              }}
            />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 mt-16">
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight mb-1">
              {selectedMovie.title}
            </h2>

            <div className="flex flex-wrap items-center gap-3 mb-3 text-sm">
              {/* TMDB Rating */}
              <span className="flex items-center gap-1 bg-yellow-500/20 text-yellow-400 px-2.5 py-1 rounded-full font-semibold">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {selectedMovie.vote_average?.toFixed(1)} TMDB
              </span>
              {/* Release Date */}
              <span className="text-gray-400">{formatDate(selectedMovie.release_date)}</span>
            </div>

            {/* Favorite */}
            <button
              onClick={() => toggleFavorite(selectedMovie)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4 transition-all duration-200 ${
                fav
                  ? "bg-red-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-red-600 hover:text-white border border-gray-700"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill={fav ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              {fav ? "Remove from Favorites" : "Add to Favorites"}
            </button>

            {/* User Rating */}
            <div className="mb-3">
              <p className="text-gray-400 text-xs mb-1 uppercase tracking-wide">Your Rating</p>
              <StarRating movieId={selectedMovie.id} size="md" />
            </div>
          </div>
        </div>

        {/* Overview */}
        <div className="px-5 pb-4">
          {selectedMovie.overview && (
            <div className="mb-5">
              <h3 className="text-gray-400 text-xs uppercase tracking-wide mb-2">Overview</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{selectedMovie.overview}</p>
            </div>
          )}

          {/* Trailer Section */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <button
                onClick={() => setShowTrailer((v) => !v)}
                disabled={loadingTrailer || !trailer}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  trailer
                    ? "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/40 active:scale-95"
                    : "bg-gray-800 text-gray-500 cursor-not-allowed"
                }`}
              >
                {loadingTrailer ? (
                  <>
                    <div className="w-4 h-4 border-2 border-gray-600 border-t-white rounded-full animate-spin" />
                    Loading…
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    {showTrailer ? "Hide Trailer" : "Play Trailer"}
                  </>
                )}
              </button>
              {!loadingTrailer && !trailer && (
                <span className="text-gray-500 text-xs">No trailer available</span>
              )}
            </div>

            {/* YouTube Iframe */}
            {showTrailer && trailer && (
              <div className="rounded-xl overflow-hidden shadow-2xl aspect-video">
                <iframe
                  key={trailer.key}
                  src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                  title="Movie Trailer"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
