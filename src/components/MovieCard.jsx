function MovieCard({ movie }) {
  const image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow hover:scale-105 transition">
      <img src={image} alt={movie.title} className="w-full h-64 object-cover" />
      <div className="p-2">
        <h2 className="text-sm font-semibold">{movie.title}</h2>
        <p className="text-yellow-400">⭐ {movie.vote_average}</p>
      </div>
    </div>
  );
}

export default MovieCard;