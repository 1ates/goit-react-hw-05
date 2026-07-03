import { Navigate } from 'react-router-dom';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <>
      <section className={styles.page}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.text}>Redirecting you to the home page.</p>
      </section>
      <Navigate to="/" replace />
    </>
  );
}
