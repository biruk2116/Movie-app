import MovieCard from "./MovieCard";

function MovieGrid({ movies }) {
  return (
    <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieGrid;