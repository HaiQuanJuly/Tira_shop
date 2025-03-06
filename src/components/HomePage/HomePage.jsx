import MyHeader from "../Header/Header";
import Footer from "../Footer/Footer";
import Brand from "../Brand/Brand";
import Men from "../Men/BannerGucciMen";
import Women from "../Women/BannerGucciWomen";
import Sneaker from "../Sneaker/Sneaker";
import PostList from "../PostList/PostList";

function HomePage() {
  return (
    <>
      <MyHeader></MyHeader>
      <Brand></Brand>
      <Men></Men>
      <Sneaker></Sneaker>
      <Women></Women>
      <PostList></PostList>
      <Footer></Footer>
    </>
  );
}

export default HomePage;
