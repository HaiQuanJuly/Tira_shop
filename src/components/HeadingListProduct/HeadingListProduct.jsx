import CoutdownBanner from "../CoutdownBanner/CoutdownBanner";
import MainLayout from "../Layout/Layout";
import ProductItem from "../ProductItem/ProductItem";
import styles from "./styles.module.scss";

function HeadingListProduct() {
  const { container, containerItem } = styles;
  return (
    <MainLayout>
      <div className={container}>
        <CoutdownBanner></CoutdownBanner>
        <div className={containerItem}>
          <ProductItem></ProductItem>
          <ProductItem></ProductItem>
        </div>
      </div>
    </MainLayout>
  );
}

export default HeadingListProduct;
