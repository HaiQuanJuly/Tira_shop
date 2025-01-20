import MyHeader from "../Header/Header";
import Banner from "../Banner/Banner";
import styles from "./styles.module.scss";

function HomePage() {
  const { container } = styles;
  return (
    <div>
      <div className={container}>
        <MyHeader></MyHeader>
        <Banner></Banner>
      </div>
    </div>
  );
}

export default HomePage;
