import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import userIcon from "../../assets/icons/svgs/userIcon.svg";
import cartIcon from "../../assets/icons/svgs/cartIcon.svg";
import searchIcon from "../../assets/icons/svgs/searchIcon.svg";
import barIcon from "../../assets/icons/svgs/bar.svg";
import closeIcon from "../../assets/icons/svgs/close.svg";
import bannerGucci from "../../assets/icons/images/bannerGucci.png";

function MyHeader() {
  const navigate = useNavigate();
  const navigateCart = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hàm xử lý logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Header xuất hiện khi scroll */}
      <header
        className={`${styles.header} ${isScrolled ? styles.fixedHeader : ""}`}
      >
        <h1
          className={`${styles.headerTitle} ${
            isScrolled ? styles.showHeaderTitle : ""
          }`}
        >
          TIRA
        </h1>
        <div
          className={`${styles.iconBox} ${isScrolled ? styles.showIcons : ""}`}
        >
          {!isAuthenticated && (
            <img
              src={userIcon}
              alt="User Icon"
              className={styles.headerIcon}
              onClick={() => navigateCart("/auth")}
            />
          )}
          <img src={cartIcon} alt="Cart Icon" className={styles.headerIcon} />
          <img
            src={searchIcon}
            alt="Search Icon"
            className={styles.headerIcon}
          />
          <img
            src={barIcon}
            alt="Menu Icon"
            className={styles.headerIcon}
            onClick={() => setIsMenuOpen(true)}
          />
        </div>
      </header>

      {/* Banner Section */}
      <div className={styles.banner}>
        <img src={bannerGucci} className={styles.bannerImage} alt="Banner" />
        <div
          className={`${styles.bannerOverlay} ${
            isScrolled ? styles.hidden : ""
          }`}
        >
          <h1 className={styles.bannerTitle}>TIRA</h1>
        </div>
        <div
          className={`${styles.bannerIcons} ${isScrolled ? styles.flyUp : ""}`}
        >
          {!isAuthenticated && (
            <img
              src={userIcon}
              alt="User Icon"
              className={styles.bannerIcon}
              onClick={() => navigate("/auth")}
            />
          )}
          <img
            src={cartIcon}
            alt="Cart Icon"
            className={styles.bannerIcon}
            onClick={() => navigate("/cart")}
          />
          <img
            src={searchIcon}
            alt="Search Icon"
            className={styles.bannerIcon}
          />
          <img
            src={barIcon}
            alt="Menu Icon"
            className={styles.bannerIcon}
            onClick={() => setIsMenuOpen(true)}
          />
        </div>
      </div>

      {/* Overlay để làm mờ background khi sidebar mở */}
      <div
        className={`${styles.overlay} ${isMenuOpen ? styles.show : ""}`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      {/* Sidebar Menu */}
      <div className={`${styles.sidebarMenu} ${isMenuOpen ? styles.open : ""}`}>
        <button
          className={styles.closeBtn}
          onClick={() => setIsMenuOpen(false)}
        >
          <img src={closeIcon} alt="Close" />
        </button>
        <ul className={styles.menuList}>
          <li>Gucci</li>
          <li>Calvin</li>
          <li>Versace</li>
          <li>Zara</li>
          {!isAuthenticated ? (
            <li onClick={() => navigate("/auth")}>Sign In</li>
          ) : (
            <li onClick={handleLogout}>Logout</li>
          )}
          <li>My Account</li>
          <li>My Orders</li>
          <li>Contact Us</li>
        </ul>
      </div>
    </>
  );
}

export default MyHeader;
