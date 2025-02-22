import MyHeader from "../Header/Header";
import AdvanceHeadling from "../AdvanceHeadling/AdvanceHeadling";
// import HeadingListProduct from "../HeadingListProduct/HeadingListProduct";
import Brands from "../Brands/Brands";
import ProductList from "../ProductItem/ProductList";
import Footer from "../Footer/Footer";

function HomePage() {
  return (
    <>
      <MyHeader></MyHeader>
      <Brands></Brands>
      <AdvanceHeadling></AdvanceHeadling>
      {/* <HeadingListProduct></HeadingListProduct> */}
      <ProductList></ProductList>
      <Footer></Footer>
    </>
  );
}

export default HomePage;
