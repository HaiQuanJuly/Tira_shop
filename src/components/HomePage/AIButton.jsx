import { useState } from "react";
import styles from "./styles.module.scss";
import aiIcon from "../../assets/icons/images/aiTryOn.webp"; // Đường dẫn đến icon áo thun

const AIButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAI = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Nút Try-On */}
      <button className={styles.aiButton} onClick={toggleAI}>
        <img src={aiIcon} alt="AI Try-On" />
      </button>

      {/* Màn hình trắng hiển thị khi click vào Try-On */}
      {isOpen && <div className={styles.aiScreen}></div>}
    </>
  );
};

export default AIButton;
