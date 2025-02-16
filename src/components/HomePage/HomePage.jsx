import MyHeader from "../Header/Header";
import Banner from "../Banner/Banner";
import Info from "../Info/Info";
import AdvanceHeadling from "../AdvanceHeadling/AdvanceHeadling";
import HeadingListProduct from "../HeadingListProduct/HeadingListProduct";
import Brands from "../Brands/Brands";
import ProductList from "../ProductItem/ProductList";

function HomePage() {
  return (
    <>
      <MyHeader></MyHeader>
      <Banner></Banner>
      <Info></Info>
      <Brands></Brands>
      <AdvanceHeadling></AdvanceHeadling>
      <HeadingListProduct></HeadingListProduct>
      <ProductList></ProductList>
      <div
        style={{
          height: "200px",
        }}
      ></div>
    </>
  );
}

export default HomePage;
