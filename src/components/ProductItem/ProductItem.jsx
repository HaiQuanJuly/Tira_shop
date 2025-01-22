import styles from "./styles.module.scss";
import reloadIcon from "../../assets/icons/svgs/reloadIcon.svg";
import heartIcon from "../../assets/icons/svgs/heartIcon.svg";
import cartIcon from "../../assets/icons/svgs/cartIcon.svg";

function ProductItem({ src, prevSrc, name, price }) {
  const {
    boxImg,
    showImgWhenHover,
    showFunctionWhenHover,
    boxIcon,
    title,
    priceCl,
  } = styles;
  return (
    <div>
      <div className={boxImg}>
        <img
          src="https://xstore.8theme.com/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-1.1-min.jpg"
          alt=""
        ></img>
        <img
          src="https://xstore.8theme.com/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-1.2-min.jpg"
          className={showImgWhenHover}
        ></img>
        <div className={showFunctionWhenHover}>
          <div className={boxIcon}>
            <img src={cartIcon}></img>
          </div>
          <div className={boxIcon}>
            <img src={heartIcon}></img>
          </div>
          <div className={boxIcon}>
            <img src={reloadIcon}></img>
          </div>
          <div className={boxIcon}>
            <img src={cartIcon}></img>
          </div>
        </div>
      </div>
      <div className={title}>10K Yellow Gold</div>
      <div className={priceCl}>$99.99</div>
    </div>
  );
}

export default ProductItem;
