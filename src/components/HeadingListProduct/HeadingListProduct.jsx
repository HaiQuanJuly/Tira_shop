import CoutdownBanner from "../CoutdownBanner/CoutdownBanner";
import CountdownTimer from "../CoutdownTimer/CoutdownTimer";
import MainLayout from "../Layout/Layout";
import styles from "./styles.module.scss";

function HeadingListProduct() {
  const { container, containerItem } = styles;
  const targetDate = "2025-12-31T00:00:00";
  return (
    <MainLayout>
      {/* <CountdownTimer targetDate={targetDate}></CountdownTimer> */}

      <div className={container}>
        <CoutdownBanner></CoutdownBanner>
        <div className={containerItem}>
          <div>1</div>
          <div>2</div>
        </div>
      </div>
    </MainLayout>
  );
}

export default HeadingListProduct;
