// src/components/MovieCard.jsx
import { useApp } from "../context/AppContext";
import { getPosterUrl, getYear } from "../utils/imageHelpers";
import StarRating from "./StarRating";

export default function MovieCard({ movie }) {
  const { isFavorite, toggleFavorite, setSelectedMovie } = useApp();
  const fav = isFavorite(movie.id);

  return (
    <div
      className="movie-card group relative rounded-xl overflow-hidden bg-gray-800 cursor-pointer
        transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/60"
      onClick={() => setSelectedMovie(movie)}
    >
      {/* Poster */}
      <div className="relative w-full aspect-[2/3] overflow-hidden bg-gray-700">
        <img
          src={getPosterUrl(movie.poster_path, "w500")}
          alt={movie.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/500x750/1f2937/6b7280?text=No+Image";
          }}
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-lg shadow-red-900/50 transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        {/* TMDB Rating Badge */}
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
          <span className="text-yellow-400 text-xs">★</span>
          <span className="text-white text-xs font-bold">
            {movie.vote_average?.toFixed(1) ?? "N/A"}
          </span>
        </div>
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(movie);
          }}
          title={fav ? "Remove from favorites" : "Add to favorites"}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            fav
              ? "bg-red-600 text-white shadow-lg shadow-red-900/50"
              : "bg-black/60 text-gray-300 hover:bg-red-600 hover:text-white backdrop-blur-sm"
          }`}
        >
          <svg
            className="w-4 h-4"
            fill={fav ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* Card Footer */}
      <div className="p-3 space-y-1">
        <h3 className="text-white font-semibold text-sm leading-tight line-clamp-1">
          {movie.title}
        </h3>
        <p className="text-gray-400 text-xs">{getYear(movie.release_date)}</p>
        <StarRating movieId={movie.id} size="sm" />
      </div>
    </div>
  );
}