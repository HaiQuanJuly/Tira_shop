import MyHeader from "../Header/Header";
// import HeadingListProduct from "../HeadingListProduct/HeadingListProduct";
import ProductList from "../ProductItem/ProductList";
import Footer from "../Footer/Footer";
import Brand from "../../Brand/Brand";
import Men from "../Men/BannerGucciMen";
import Women from "../Women/BannerGucciWomen";
import Sneaker from "../Sneaker/Sneaker";

function HomePage() {
  return (
    <>
      <MyHeader></MyHeader>
      <Brand></Brand>
      <Men></Men>
      <Sneaker></Sneaker>
      <Women></Women>
      <ProductList></ProductList>
      <Footer></Footer>
    </>
  );
}

export default HomePage;
