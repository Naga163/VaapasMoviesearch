import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
      const data = await response.json();
      setMovies(data.docs);
    } catch (error) {
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Movie Search</h1>
      <SearchBar onSearch={fetchMovies} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.key} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default App;
