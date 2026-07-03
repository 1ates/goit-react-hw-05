import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../fetch.js';
import styles from './MovieReviews.module.css';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function fetchReviews() {
      try {
        setLoading(true);
        setError('');
        const nextReviews = await getMovieReviews(movieId);

        if (isMounted) {
          setReviews(nextReviews);
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

    fetchReviews();

    return () => {
      isMounted = false;
    };
  }, [movieId]);

  if (loading) {
    return <p className={styles.state}>Loading reviews...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (reviews.length === 0) {
    return <p className={styles.state}>We do not have any reviews for this movie.</p>;
  }

  return (
    <ul className={styles.list}>
      {reviews.map(({ id, author, content }) => (
        <li key={id} className={styles.card}>
          <h3 className={styles.author}>Author: {author}</h3>
          <p className={styles.content}>{content}</p>
        </li>
      ))}
    </ul>
  );
}
