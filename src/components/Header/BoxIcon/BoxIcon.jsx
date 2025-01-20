import styles from "../styles.module.scss";
import fbIcon from "../../../assets/icons/svgs/fbIcon.svg";
import insIcon from "../../../assets/icons/svgs/insIcon.svg";
import ytbIcon from "../../../assets/icons/svgs/ytIcon.svg";

function BoxIcon({ type, href }) {
  const { boxIcon } = styles;
  const handleRenderIcon = (type) => {
    switch (type) {
      case "fb":
        return fbIcon;
      case "ins":
        return insIcon;
      case "ytb":
        return ytbIcon;
    }
  };
  return (
    <div className={boxIcon}>
      <img src={handleRenderIcon(type)} alt={type}></img>
    </div>
  );
}

export default BoxIcon;
