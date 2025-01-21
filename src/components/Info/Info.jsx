import MainLayout from "../Layout/Layout";
import InfoCart from "./InfoCart/InfoCart";
import { dataInfo } from "./constant";
import styles from "./styles.module.scss";

function Info() {
  const { container } = styles;
  return (
    <MainLayout>
      <div className={container}>
        {dataInfo.map((item) => {
          return (
            <InfoCart
              content={item.title}
              description={item.description}
              src={item.src}
            ></InfoCart>
          );
        })}
      </div>
    </MainLayout>
  );
}

export default Info;
