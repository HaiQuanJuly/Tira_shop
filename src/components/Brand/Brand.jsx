import styles from "./styles.module.scss";
import bag from "../../assets/icons/images/Bag.jpg";
import shose from "../../assets/icons/images/Shose.webp";
import sneaker from "../../assets/icons/images/Sneaker.jpg";
import handleBag from "../../assets/icons/images/HandleBag.webp";

export default function Brand() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Curated by the House</h1>
      <div className={styles.brand}>
        <div>
          <img src={bag} className={styles.imgBrand}></img>
          <p className={styles.name_brand}>Versace</p>
        </div>
        <div>
          <img src={shose} className={styles.imgBrand}></img>
          <p className={styles.name_brand}>Zara</p>
        </div>
        <div>
          <img src={sneaker} className={styles.imgBrand}></img>
          <p className={styles.name_brand}>Calvin</p>
        </div>
        <div>
          <img src={handleBag} className={styles.imgBrand}></img>
          <p className={styles.name_brand}>Gucci</p>
        </div>
      </div>
    </div>
  );
}
