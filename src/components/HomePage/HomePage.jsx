import MyHeader from "../Header/Header";
import Banner from "../Banner/Banner";
// import styles from "./styles.module.scss";
import Info from "../Info/Info";
import AdvanceHeadling from "../AdvanceHeadling/AdvanceHeadling";
import HeadingListProduct from "../HeadingListProduct/HeadingListProduct";

function HomePage() {
  // const { container } = styles;
  return (
    <>
      <MyHeader></MyHeader>
      <Banner></Banner>
      <Info></Info>
      <AdvanceHeadling></AdvanceHeadling>
      <HeadingListProduct></HeadingListProduct>
    </>
  );
}

export default HomePage;
