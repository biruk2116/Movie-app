// src/pages/Home.jsx
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import GenreFilter from "../components/GenreFilter";
import MovieGrid from "../components/MovieGrid";
import Skeleton from "../components/Skeleton";
import { fetchMovies, searchMovies } from "../services/movieApi";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => { loadMovies(); }, []);

  const loadMovies = async () => {
    setLoading(true);
    const results = await fetchMovies();
    setMovies(results);
    setLoading(false);
  };

  const handleSearch = async () => {
    setLoading(true);
    if (!query) {
      await loadMovies();
    } else {
      const results = await searchMovies(query);
      setMovies(results);
    }
    setLoading(false);
  };

  const filteredMovies = selectedGenre
    ? movies.filter(m => m.genre_ids?.includes(selectedGenre))
    : movies;

  return (
    <div>
      <Navbar query={query} setQuery={setQuery} onSearch={handleSearch} />
      <GenreFilter selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
          {[...Array(10)].map((_, i) => <Skeleton key={i} />)}
        </div>
      ) : filteredMovies.length > 0 ? (
        <MovieGrid movies={filteredMovies} />
      ) : (
        <p className="text-center mt-10 text-gray-400">No movies found 😢</p>
      )}
    </div>
  );
}