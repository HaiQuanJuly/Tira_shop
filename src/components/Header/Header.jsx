import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import userIcon from "../../assets/icons/svgs/userIcon.svg";
import cartIcon from "../../assets/icons/svgs/cartIcon.svg";
import searchIcon from "../../assets/icons/svgs/searchIcon.svg";
import barIcon from "../../assets/icons/svgs/bar.svg";
import closeIcon from "../../assets/icons/svgs/close.svg"; // Icon đóng menu
import bannerGucci from "../../assets/icons/images/bannerGucci.png";

function MyHeader() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State menu

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Kiểm tra token để xác định trạng thái đăng nhập
  }, []);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
    if (!confirmLogout) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/tirashop/auth/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "", // Thêm token nếu có
          },
          body: JSON.stringify({ token }), // Gửi token trong body để tránh lỗi thiếu request body
        }
      );

      if (!response.ok) {
        console.error("Lỗi đăng xuất:", response.status);
        alert("Lỗi khi đăng xuất!");
        return;
      }

      localStorage.removeItem("token");
      setIsAuthenticated(false); // Cập nhật state để ẩn logout
      alert("Đăng xuất thành công!");
      navigate("/");
    } catch (error) {
      console.error("Lỗi kết nối đến server:", error);
      alert("Không thể kết nối đến server!");
    }
  };

  return (
    <div>
      {/* Background mờ khi mở menu */}
      {isMenuOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* Top Header */}
      <div className={styles.topHeader}>
        <div className={styles.topHeaderItem}>Introduce Shop</div>
        <div className={styles.topHeaderItem}>New Product</div>
      </div>

      {/* Banner Section */}
      <div className={styles.banner}>
        <img src={bannerGucci} className={styles.bannerImage} alt="Banner" />
        <div className={styles.bannerOverlay}>
          <h1 className={styles.shopTitle}>Tira</h1>
          <div className={styles.iconBox}>
            <div className={styles.iconContainer}>
              {/* Ẩn icon User nếu đã đăng nhập */}
              {!isAuthenticated && (
                <img
                  src={userIcon}
                  alt="User Icon"
                  className={styles.bannerIcon}
                  onClick={() => navigate("/auth")}
                  style={{ cursor: "pointer" }}
                />
              )}

              {/* Cart & Search */}
              <img
                src={cartIcon}
                alt="Cart Icon"
                className={styles.bannerIcon}
              />
              <img
                src={searchIcon}
                alt="Search Icon"
                className={styles.bannerIcon}
              />

              {/* Menu Icon */}
              <div className={styles.bar} onClick={() => setIsMenuOpen(true)}>
                <img
                  src={barIcon}
                  alt="Menu Icon"
                  className={styles.bannerIcon}
                />
                <p className={styles.bannerIcon}>Menu</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Menu */}
      <div className={`${styles.sidebarMenu} ${isMenuOpen ? styles.show : ""}`}>
        <div className={styles.menuHeader}>
          <button
            className={styles.closeBtn}
            onClick={() => setIsMenuOpen(false)}
          >
            <img src={closeIcon} alt="Close" />
          </button>
        </div>
        <ul className={styles.menuList}>
          <li>Sneakers</li>
          <li>New In</li>
          <li>Handbags</li>
          <li>Travel</li>
          <li>Women</li>
          <li>Men</li>
          <li>Children</li>
          <li>Jewelry & Watches</li>
          <li>Décor & Lifestyle</li>
          <li>Fragrances & Make-Up</li>
          <li>Gifts</li>
          <li>Gucci Services</li>
          <li>World of Gucci</li>
          <li>Store Locator</li>

          {/* Hiển thị Sign In khi chưa đăng nhập */}
          {!isAuthenticated && (
            <li onClick={() => navigate("/auth")} className={styles.signInItem}>
              Sign In
            </li>
          )}

          {/* Hiển thị "Đăng xuất" chỉ trong thanh Bar */}
          {isAuthenticated && (
            <li onClick={handleLogout} className={styles.logoutItem}>
              Logout
            </li>
          )}

          <li>My Orders</li>
          <li>Contact Us</li>
          <li>+1 8774822430</li>
        </ul>
      </div>
    </div>
  );
}

export default MyHeader;
