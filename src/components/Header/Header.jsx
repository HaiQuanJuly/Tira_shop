import BoxIcon from "./BoxIcon/BoxIcon";
import Menu from "./Menu/Menu";
import { dataBoxIcon, dataMenu } from "./constants";
import styles from "./styles.module.scss";
import Logo from "../../assets/icons/images/Logo-retina.png";
import reloadIcon from "../../assets/icons/svgs/reloadIcon.svg";
import heartIcon from "../../assets/icons/svgs/heartIcon.svg";
import cartIcon from "../../assets/icons/svgs/cartIcon.svg";

function MyHeader() {
  const {
    containerBoxIcon,
    containerMenu,
    containerHeader,
    containerBox,
    container,
  } = styles;
  return (
    <div className={container}>
      <div className={containerHeader}>
        <div className={containerBox}>
          <div className={containerBoxIcon}>
            {dataBoxIcon.map((item) => {
              return <BoxIcon type={item.type} href={item.href}></BoxIcon>;
            })}
          </div>
          <div className={containerMenu}>
            {dataMenu.slice(0, 3).map((item) => {
              return <Menu content={item.content} href={item.href}></Menu>;
            })}
          </div>
        </div>
        <div>
          <img
            src={Logo}
            alt="Logo"
            style={{
              width: "153px",
              height: "53px",
            }}
          ></img>
        </div>
        <div className={containerBox}>
          <div className={containerMenu}>
            {dataMenu.slice(3, dataMenu.lenght).map((item) => {
              return <Menu content={item.content} href={item.href}></Menu>;
            })}
          </div>

          <div className={containerBoxIcon}>
            <img width={26} height={26} src={heartIcon} alt="reloadIcon"></img>
            <img width={26} height={26} src={cartIcon} alt="reloadIcon"></img>
            <img width={26} height={26} src={reloadIcon} alt="reloadIcon"></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyHeader;
