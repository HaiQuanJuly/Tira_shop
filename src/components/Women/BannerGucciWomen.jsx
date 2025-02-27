import styles from "./styles.module.scss";

export default function BannerGucciWomen() {
  return (
    <div className={styles.container}>
      <div className={styles.imgBanner}>
        <div className={styles.title}>
          <button>Women</button>
          <div>Introducing An Ultra-Contemporasy Style</div>
          <div>Versace</div>
          <button>Discover More</button>
        </div>
      </div>
    </div>
  );
}
