import styles from "./styles.module.scss";

export default function BannerGucciWomen() {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.imgBanner}>
        <div className={styles.title}>
          <button className={styles.categoryButton}>Women</button>
          <h1>Introducing An Ultra-Contemporary Style</h1>
          <h2>Versace</h2>
          <button className={styles.discoverButton}>Discover More</button>
        </div>
      </div>
    </div>
  );
}
