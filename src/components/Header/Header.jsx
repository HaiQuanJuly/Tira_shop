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

  return (
    <>
      {/* Header xuất hiện khi scroll */}
      <header className={`${styles.header} ${isScrolled ? styles.fixedHeader : ""}`}>
        <h1 className={`${styles.headerTitle} ${isScrolled ? styles.showHeaderTitle : ""}`}>TIRA</h1>
        <div className={`${styles.iconBox} ${isScrolled ? styles.showIcons : ""}`}>
          <img src={userIcon} alt="User Icon" className={styles.headerIcon} onClick={() => navigate("/auth")} />
          <img src={cartIcon} alt="Cart Icon" className={styles.headerIcon} />
          <img src={searchIcon} alt="Search Icon" className={styles.headerIcon} />
          <img src={barIcon} alt="Menu Icon" className={styles.headerIcon} onClick={() => setIsMenuOpen(true)} />
        </div>
      </header>

      {/* Banner Section */}
      <div className={styles.banner}>
        <img src={bannerGucci} className={styles.bannerImage} alt="Banner" />
        <div className={`${styles.bannerOverlay} ${isScrolled ? styles.hidden : ""}`}>
          <h1 className={styles.bannerTitle}>TIRA</h1>
        </div>
        <div className={`${styles.bannerIcons} ${isScrolled ? styles.flyUp : ""}`}>
          <img src={userIcon} alt="User Icon" className={styles.bannerIcon} onClick={() => navigate("/auth")} />
          <img src={cartIcon} alt="Cart Icon" className={styles.bannerIcon} />
          <img src={searchIcon} alt="Search Icon" className={styles.bannerIcon} />
          <img src={barIcon} alt="Menu Icon" className={styles.bannerIcon} onClick={() => setIsMenuOpen(true)} />
        </div>
      </div>

      {/* Sidebar Menu */}
      {isMenuOpen && (
        <div className={styles.sidebarMenu}>
          <button className={styles.closeBtn} onClick={() => setIsMenuOpen(false)}>
            <img src={closeIcon} alt="Close" />
          </button>
          <ul className={styles.menuList}>
            <li>Gucci</li>
            <li>Calvin</li>
            <li>Versace</li>
            <li>Zara</li>
            <li>Women</li>
            <li>Men</li>
            <li>Children</li>
            {!isAuthenticated && <li onClick={() => navigate("/auth")}>Sign In</li>}
            {isAuthenticated && <li onClick={() => setIsAuthenticated(false)}>Logout</li>}
            <li>My Orders</li>
            <li>Contact Us</li>
          </ul>
        </div>
      )}
    </>
  );
}

export default MyHeader;
