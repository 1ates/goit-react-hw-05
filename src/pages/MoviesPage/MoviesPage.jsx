import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import { searchMovies } from '../../fetch.js';
import styles from './MoviesPage.module.css';

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') ?? '');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const currentQuery = searchParams.get('query');

    if (!currentQuery) {
      return;
    }

    let isMounted = true;

    async function fetchMovies() {
      try {
        setLoading(true);
        setError('');
        setMovies([]);
        const results = await searchMovies(currentQuery);

        if (isMounted) {
          setMovies(results);
        }
      } catch (fetchError) {
        if (isMounted) {
          setMovies([]);
          setError(fetchError.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchMovies();

    return () => {
      isMounted = false;
    };
  }, [searchParams]);

  function handleSubmit(event) {
    event.preventDefault();
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      setSearchParams({});
      setError('');
      setLoading(false);
      setMovies([]);
      return;
    }

    setSearchParams({ query: normalizedQuery });
  }

  return (
    <section className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          name="query"
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder="Search movies"
          autoComplete="off"
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>

      {loading && <Loader>Searching movies...</Loader>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && searchParams.get('query') && movies.length === 0 && !error && (
        <p className={styles.state}>No movies were found for your request.</p>
      )}
      {movies.length > 0 && <MovieList movies={movies} />}
    </section>
  );
}
