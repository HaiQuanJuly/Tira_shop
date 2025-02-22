import CountdownTimer from "../CoutdownTimer/CoutdownTimer";
import styles from "./styles.module.scss";

function CoutdownBanner() {
  const { container, containerTimer, title, boxBtn } = styles;
  const targetDate = "2025-12-31T00:00:00";
  return (
    <div className={container}>
      <div className={containerTimer}>
        <CountdownTimer targetDate={targetDate}></CountdownTimer>
      </div>
      <p className={title}>The classics make a comeback</p>
      <div className={boxBtn}></div>
    </div>
  );
}

export default CoutdownBanner;
