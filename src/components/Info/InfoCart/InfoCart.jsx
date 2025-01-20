import styles from "../styles.module.scss";

function InfoCart({ content, description, src }) {
  console.log(content, description, src);
  const { containerCart, contentContent, title, des } = styles;
  return (
    <div className={containerCart}>
      <img width={40} height={41} src={src} atl="TruckIcon" />
      <div className={contentContent}>
        <div className={title}>{content}</div>
        <div className={des}>{description}</div>
      </div>
    </div>
  );
}

export default InfoCart;
