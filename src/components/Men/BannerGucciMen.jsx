import styles from "./styles.module.scss";
export default function BannerGucciMen() {
  return (
    <div className={styles.container}>
      <div className={styles.imgBanner}>
        <div className={styles.title}>
          <button>Men</button>
          <div>Introducing An Ultra-Contemporasy Style</div>
          <div>Gucci</div>
          <button>Discover More</button>
        </div>
      </div>
    </div>
  );
}
