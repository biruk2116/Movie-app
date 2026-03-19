// src/components/GenreFilter.jsx
import { useApp } from "../context/AppContext";
import { useGenres } from "../hooks/useGenres";

export default function GenreFilter() {
  const { selectedGenre, setSelectedGenre } = useApp();
  const { genres } = useGenres();

  if (!genres.length) return null;

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide px-4 md:px-0">
      <button
        onClick={() => setSelectedGenre(null)}
        className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
          selectedGenre === null
            ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-900/40"
            : "bg-gray-800 border-gray-700 text-gray-300 hover:border-red-500 hover:text-white"
        }`}
      >
        All
      </button>
      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => setSelectedGenre(genre.id)}
          className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
            selectedGenre === genre.id
              ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-900/40"
              : "bg-gray-800 border-gray-700 text-gray-300 hover:border-red-500 hover:text-white"
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}