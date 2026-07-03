import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getImageUrl, getMovieCredits } from '../../fetch.js';
import styles from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function fetchCredits() {
      try {
        setLoading(true);
        setError('');
        const credits = await getMovieCredits(movieId);

        if (isMounted) {
          setCast(credits);
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(fetchError.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCredits();

    return () => {
      isMounted = false;
    };
  }, [movieId]);

  if (loading) {
    return <p className={styles.state}>Loading cast...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (cast.length === 0) {
    return <p className={styles.state}>We do not have cast information yet.</p>;
  }

  return (
    <ul className={styles.list}>
      {cast.map(({ cast_id, credit_id, profile_path, name, character }) => (
        <li key={cast_id ?? credit_id} className={styles.card}>
          <img className={styles.photo} src={getImageUrl(profile_path, 'w300')} alt={name} loading="lazy" />
          <div className={styles.content}>
            <p className={styles.name}>{name}</p>
            <p className={styles.role}>Character: {character || 'Unknown'}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
