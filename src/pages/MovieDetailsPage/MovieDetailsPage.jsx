import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { getImageUrl, getMovieDetails } from '../../fetch.js';
import styles from './MovieDetailsPage.module.css';

const buildLinkClassName = ({ isActive }) => (isActive ? `${styles.detailsLink} ${styles.active}` : styles.detailsLink);

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = location.state ?? '/movies';
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function fetchMovieDetails() {
      try {
        setLoading(true);
        setError('');
        setMovie(null);
        const movieDetails = await getMovieDetails(movieId);

        if (isMounted) {
          setMovie(movieDetails);
        }
      } catch (fetchError) {
        if (isMounted) {
          setMovie(null);
          setError(fetchError.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchMovieDetails();

    return () => {
      isMounted = false;
    };
  }, [movieId]);

  return (
    <section className={styles.page}>
      <Link to={backLink} className={styles.backLink}>
        Go back
      </Link>

      {loading && <p className={styles.state}>Loading movie details...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {movie && (
        <>
          <div className={styles.card}>
            <img className={styles.poster} src={getImageUrl(movie.poster_path)} alt={movie.title} />
            <div className={styles.content}>
              <h1 className={styles.title}>
                {movie.title} <span className={styles.year}>({movie.release_date?.slice(0, 4) ?? 'N/A'})</span>
              </h1>
              <p className={styles.score}>User score: {Math.round((movie.vote_average ?? 0) * 10)}%</p>
              <div>
                <h2 className={styles.subtitle}>Overview</h2>
                <p className={styles.text}>{movie.overview}</p>
              </div>
              <div>
                <h2 className={styles.subtitle}>Genres</h2>
                <p className={styles.text}>{movie.genres.map(genre => genre.name).join(', ')}</p>
              </div>
            </div>
          </div>

          <div className={styles.additional}>
            <p className={styles.additionalTitle}>Additional information</p>
            <div className={styles.links}>
              <NavLink to="cast" state={backLink} className={buildLinkClassName}>
                Cast
              </NavLink>
              <NavLink to="reviews" state={backLink} className={buildLinkClassName}>
                Reviews
              </NavLink>
            </div>
          </div>

          <Outlet />
        </>
      )}
    </section>
  );
}
