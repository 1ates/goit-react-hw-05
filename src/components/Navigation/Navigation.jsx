import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const buildLinkClassName = ({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link);

export default function Navigation() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={buildLinkClassName}>
          Home
        </NavLink>
        <NavLink to="/movies" className={buildLinkClassName}>
          Movies
        </NavLink>
      </div>
    </header>
  );
}
