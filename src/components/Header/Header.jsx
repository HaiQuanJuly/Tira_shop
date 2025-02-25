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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Kiểm tra token để xác định trạng thái đăng nhập
  }, []);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
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
        console.error("Logout error:", response.status);
        alert("Logout error:");
        return;
      }

      localStorage.removeItem("token");
      setIsAuthenticated(false); // Cập nhật state để ẩn logout
      alert("Log out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error connecting to server:", error);
      alert("Unable to connect to server!");
    }
  };

  return (
    <div>
      {/* Hiển thị overlay khi mở menu */}
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
          <li>
            Gucci
            <ul className={styles.dropdown}>
              <li>Sneakers</li>
              <li>Handbags</li>
              <li>Jewelry & Watch</li>
              <li>Trousers</li>
              <li>Shirt</li>
            </ul>
          </li>
          <li>
            Calvin
            <ul className={styles.dropdown}>
              <li>Sneakers</li>
              <li>Handbags</li>
              <li>Jewelry & Watch</li>
              <li>Trousers</li>
              <li>Shirt</li>
            </ul>
          </li>
          <li>
            Versace
            <ul className={styles.dropdown}>
              <li>Sneakers</li>
              <li>Handbags</li>
              <li>Jewelry & Watch</li>
              <li>Trousers</li>
              <li>Shirt</li>
            </ul>
          </li>
          <li>
            Zara
            <ul className={styles.dropdown}>
              <li>Sneakers</li>
              <li>Handbags</li>
              <li>Jewelry & Watch</li>
              <li>Trousers</li>
              <li>Shirt</li>
            </ul>
          </li>
          <li>
            Women
            <ul className={styles.dropdown}>
              <li>Sneakers</li>
              <li>Handbags</li>
              <li>Jewelry & Watch</li>
              <li>Trousers</li>
              <li>Shirt</li>
            </ul>
          </li>
          <li>
            Men
            <ul className={styles.dropdown}>
              <li>Sneakers</li>
              <li>Handbags</li>
              <li>Jewelry & Watch</li>
              <li>Trousers</li>
              <li>Shirt</li>
            </ul>
          </li>
          <li>
            Children
            <ul className={styles.dropdown}>
              <li>Sneakers</li>
              <li>Handbags</li>
              <li>Jewelry & Watch</li>
              <li>Trousers</li>
              <li>Shirt</li>
            </ul>
          </li>
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
        </ul>
      </div>
    </div>
  );
}

export default MyHeader;
