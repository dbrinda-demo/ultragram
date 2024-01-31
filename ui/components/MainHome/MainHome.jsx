import styles from './MainHome.module.less';

export default function MainHome({ post }) {
  return (
    <div className={styles.home}>
      <h2>Welcome to Ultragram</h2>
      <h3>The ultimate instagram clone.</h3>
      <div className={styles.mainImgContainer}>
        <img className={styles.mainImg} src='/images/cat-main.jpg' />
      </div>
    </div>
  );
}

