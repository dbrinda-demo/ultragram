import styles from './MainFooter.module.less';

export default function MainFooter(props) {
  return (
    <a href="#" className={styles.careers} onClick={e => e.preventDefault()}>Careers</a>
  );
}
