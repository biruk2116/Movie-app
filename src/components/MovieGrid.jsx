// src/components/MovieGrid.jsx
import MovieCard from "./MovieCard";
import SkeletonCard from "./SkeletonCard";
import NoResults from "./NoResults";

const SKELETON_COUNT = 20;

export default function MovieGrid({ movies, loading, error, searchQuery, onLoadMore, hasMore }) {
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <div className="text-5xl mb-4">⚠️</div>
        <h3 className="text-xl font-bold text-white mb-1">Something went wrong</h3>
        <p className="text-gray-400 text-sm">{error}</p>
      </div>
    );
  }

  if (!loading && movies.length === 0) {
    return <NoResults query={searchQuery} />;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        {loading &&
          Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <SkeletonCard key={`sk-${i}`} />
          ))}
      </div>

      {/* Load More */}
      {!loading && hasMore && onLoadMore && (
        <div className="flex justify-center pt-2">
          <button
            onClick={onLoadMore}
            className="px-8 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold
              transition-all duration-200 hover:shadow-lg hover:shadow-red-900/40 active:scale-95"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}