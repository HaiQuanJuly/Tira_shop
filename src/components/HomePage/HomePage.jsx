import MyHeader from "../Header/Header";
import Footer from "../Footer/Footer";
import Brand from "../Brand/Brand";
import Men from "../Men/BannerGucciMen";
import Women from "../Women/BannerGucciWomen";
import Sneaker from "../Sneaker/Sneaker";
import PostList from "../PostList/PostList";
import ChatBox from "./ChatBox";
import AIButton from "./AIButton";

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
      <AIButton />
      <ChatBox></ChatBox>
    </>
  );
}

export default HomePage;
