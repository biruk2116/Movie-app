// src/components/MovieGrid.jsx
import React from "react";
import MovieCard from "./MovieCard";

const MovieGrid = ({ movies, isLoading, error }) => {
  if (isLoading) return <p className="text-center mt-10">Loading movies...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!movies || movies.length === 0)
    return <p className="text-center mt-10">No movies found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {movies.map((movie) => (
        <MovieCard key={movie?.id || Math.random()} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;