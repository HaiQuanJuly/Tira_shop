import MyHeader from "../Header/Header";
import Banner from "../Banner/Banner";
import Info from "../Info/Info";
import AdvanceHeadling from "../AdvanceHeadling/AdvanceHeadling";
import HeadingListProduct from "../HeadingListProduct/HeadingListProduct";
import Brands from "../Brands/Brands";

function HomePage() {
  return (
    <>
      <MyHeader></MyHeader>
      <Banner></Banner>
      <Info></Info>
      <Brands></Brands>
      <AdvanceHeadling></AdvanceHeadling>
      <HeadingListProduct></HeadingListProduct>
      <div
        style={{
          height: "200px",
        }}
      ></div>
    </>
  );
}

export default HomePage;
