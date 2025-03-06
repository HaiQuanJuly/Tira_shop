import styles from "./styles.module.scss";
import bag from "../../assets/icons/images/Bag.jpg";
import shose from "../../assets/icons/images/Shose.webp";
import sneaker from "../../assets/icons/images/Sneaker.jpg";
import handleBag from "../../assets/icons/images/HandleBag.webp";

export default function Brand() {
  return (
    <div className={styles.brandContainer}>
      <h1 className={styles.brandTitle}>Curated by the House</h1>
      <div className={styles.brandList}>
        <div className={styles.brandItem}>
          <img src={bag} alt="Versace" className={styles.brandImage} />
          <p className={styles.brandName}>Versace</p>
        </div>
        <div className={styles.brandItem}>
          <img src={shose} alt="Zara" className={styles.brandImage} />
          <p className={styles.brandName}>Zara</p>
        </div>
        <div className={styles.brandItem}>
          <img src={sneaker} alt="Calvin" className={styles.brandImage} />
          <p className={styles.brandName}>Calvin</p>
        </div>
        <div className={styles.brandItem}>
          <img src={handleBag} alt="Gucci" className={styles.brandImage} />
          <p className={styles.brandName}>Gucci</p>
        </div>
      </div>
    </div>
  );
}
