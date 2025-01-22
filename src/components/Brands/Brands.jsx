import MainLayout from "../Layout/Layout";
import styles from "./styles.module.scss";
import logoCalvin from "../../assets/images/logoCalvin.png";
import logoGucci from "../../assets/images/logoGucci.png";
import logoVersace from "../../assets/images/logoVersace.png";
import logoZara from "../../assets/images/logoZara.jpg";

function Brands() {
  const { container, container_Img } = styles;
  return (
    <MainLayout>
      <div className={container}>
        <div className={container_Img}>
          <img width={250} height={175} src={logoCalvin} alt="logoCalvin"></img>
          <img width={250} height={175} src={logoGucci} alt="logoGucci"></img>
          <img
            width={250}
            height={175}
            src={logoVersace}
            alt="logoVersace"
          ></img>
          <img width={250} height={175} src={logoZara} alt="logoZara"></img>
        </div>
      </div>
    </MainLayout>
  );
}

export default Brands;
