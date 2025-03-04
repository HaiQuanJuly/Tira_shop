import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import userIcon from "../../assets/icons/svgs/userIcon.svg";
import cartIcon from "../../assets/icons/svgs/cartIcon.svg";
import searchIcon from "../../assets/icons/svgs/searchIcon.svg";
import barIcon from "../../assets/icons/svgs/bar.svg";
import closeIcon from "../../assets/icons/svgs/close.svg";
import bannerGucci from "../../assets/icons/images/bannerGucci.png";
import ProductList from "../ProductItem/ProductList";
import Cart from "../Cart/Cart";

function MyHeader() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleAddToCart = (product, selectedSize) => {
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id && item.size === selectedSize
    );

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].stock += 1; // Cập nhật số lượng nếu sản phẩm cùng size đã có trong giỏ
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, stock: 1, size: selectedSize }]); // Thêm sản phẩm với size đã chọn
    }
  };

  const handleCartClick = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
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
              onClick={() => navigate("/auth")}
            />
          )}
          <div className={styles.cartContainer} onClick={handleCartClick}>
            <img src={cartIcon} alt="Cart Icon" className={styles.headerIcon} />
            {cart.length > 0 && (
              <span className={styles.cartCount}>{cart.length}</span>
            )}
          </div>
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
            onClick={handleCartClick}
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

      <div
        className={`${styles.overlay} ${isSidebarOpen ? styles.show : ""}`}
        onClick={closeSidebar}
        style={{
          opacity: isSidebarOpen ? 1 : 0,
          visibility: isSidebarOpen ? "visible" : "hidden",
        }}
      ></div>

      <Cart
        isSidebarOpen={isSidebarOpen}
        closeSidebar={closeSidebar}
        cart={cart}
        handleUpdateQuantity={(id, newStock) => {
          const updatedCart = cart.map((item) => {
            if (item.id === id) {
              return { ...item, stock: newStock };
            }
            return item;
          });
          setCart(updatedCart);
        }}
        handleRemoveItem={(id) => {
          const updatedCart = cart.filter((item) => item.id !== id);
          setCart(updatedCart);
        }}
      />

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

      <ProductList handleAddToCart={handleAddToCart} />
    </>
  );
}

export default MyHeader;
