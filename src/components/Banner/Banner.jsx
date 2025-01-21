import styles from "./styles.module.scss";
import Button from "../Button/Button";

function Banner() {
  const { container, content, title, des } = styles;
  return (
    <div className={container}>
      <div className={content}>
        <h1 className={title}>
          Find Clothes <br></br> That Matches Your Style
        </h1>
        <div className={des}>
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style
        </div>
        <Button content={"Go to shop"}></Button>
      </div>
    </div>
  );
}

export default Banner;
