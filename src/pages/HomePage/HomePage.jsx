import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList.jsx';
import { getTrendingMovies, isTmdbConfigured } from '../../fetch.js';
import styles from './HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function fetchTrendingMovies() {
      try {
        setError('');
        const trendingMovies = await getTrendingMovies();

        if (isMounted) {
          setMovies(trendingMovies);
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(fetchError.message);
        }
      }
    }

    fetchTrendingMovies();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Movie Finder</h1>
        <p className={styles.motto}>Trending movies you can explore today</p>
        <p className={styles.description}>
          Search movies, open full details, and browse cast and reviews with a smooth nested navigation flow.
        </p>
        {!isTmdbConfigured && <p className={styles.notice}>`VITE_TMDB_TOKEN` is not set yet.</p>}
      </div>

      {error && <p className={styles.error}>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </section>
  );
}
