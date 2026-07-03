import { Link, useLocation } from 'react-router-dom';
import { getImageUrl } from '../../fetch.js';
import styles from './MovieList.module.css';

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={styles.list}>
      {movies.map(({ id, title, poster_path, release_date, vote_average }) => (
        <li key={id} className={styles.card}>
          <Link to={`/movies/${id}`} state={location} className={styles.cardLink}>
            <img className={styles.poster} src={getImageUrl(poster_path)} alt={title} loading="lazy" />
            <div className={styles.content}>
              <h2 className={styles.title}>{title}</h2>
              <p className={styles.meta}>{release_date ? release_date.slice(0, 4) : 'Unknown year'}</p>
              <p className={styles.meta}>Rating: {vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
