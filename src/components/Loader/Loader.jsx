import styles from './Loader.module.css';

export default function Loader({ children }) {
  return (
    <>
      <div className={styles.container}>
        <p className={styles.loaderText}>{children}</p>
        <span className={styles.loader}></span>
      </div>
    </>
  );
}
