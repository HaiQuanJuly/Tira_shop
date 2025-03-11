import React from "react";
import styles from "./styles.module.scss";

const TryOn = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Nếu chưa mở thì không render

  return (
    <div className={styles.tryOnOverlay}>
      <div className={styles.tryOnContainer}>
        <h2>👕 Try-On Virtual AI</h2>
        <p>Trải nghiệm thử đồ trực tuyến với AI thông minh.</p>
        
        {/* Khu vực hiển thị nội dung Try-On */}
        <div className={styles.tryOnContent}>
          <p>Đang phát triển...</p>
        </div>

        {/* Nút đóng */}
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>
      </div>
    </div>
  );
};

export default TryOn;
