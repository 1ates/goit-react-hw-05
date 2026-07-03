import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from '../Navigation/Navigation.jsx';
import Loader from '../Loader/Loader.jsx';
import styles from './App.module.css';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage.jsx'));
const MovieDetailsPage = lazy(() => import('../../pages/MovieDetailsPage/MovieDetailsPage.jsx'));
const NotFound = lazy(() => import('../../pages/NotFound/NotFound.jsx'));
const MovieCast = lazy(() => import('../MovieCast/MovieCast.jsx'));
const MovieReviews = lazy(() => import('../MovieReviews/MovieReviews.jsx'));

export default function App() {
  return (
    <div className={styles.appShell}>
      <Navigation />
      <main className={styles.mainContent}>
        <Suspense fallback={<Loader>Loading...</Loader>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}
