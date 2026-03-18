import { useEffect, useState } from "react";
import { fetchMovies, searchMovies } from "../services/movieApi";
import Navbar from "../components/Navbar";
import MovieGrid from "../components/MovieGrid";

function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    const data = await fetchMovies();
    setMovies(data.results || []);
  };

  const handleSearch = async () => {
    if (!query) return loadMovies();
    const data = await searchMovies(query);
    setMovies(data.results || []);
  };

  return (
    <div>
      <Navbar query={query} setQuery={setQuery} onSearch={handleSearch} />
      <MovieGrid movies={movies} />
    </div>
  );
}

export default Home;