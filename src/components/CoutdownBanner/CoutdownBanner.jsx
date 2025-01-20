import CountdownTimer from "../CoutdownTimer/CoutdownTimer";
import styles from "./styles.module.scss";
import Button from "../Button/Button";

function CoutdownBanner() {
  const { container, containerTimer, title, boxBtn } = styles;
  const targetDate = "2025-12-31T00:00:00";
  return (
    <div className={container}>
      <div className={containerTimer}>
        <CountdownTimer targetDate={targetDate}></CountdownTimer>
      </div>
      <p className={title}>The classics make a comeback</p>
      <div className={boxBtn}>
        <Button content={"Buy now"}></Button>
      </div>
    </div>
  );
}

export default CoutdownBanner;
