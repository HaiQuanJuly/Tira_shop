import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";
import userIcon from "../../assets/icons/svgs/userIcon.svg";
import cartIcon from "../../assets/icons/svgs/cartIcon.svg";
import searchIcon from "../../assets/icons/svgs/searchIcon.svg";
import barIcon from "../../assets/icons/svgs/bar.svg";
import closeIcon from "../../assets/icons/svgs/close.svg";
import Search from "../Search/Search";
import { useAppContext } from "../../context/AppContext";

function FixedHeader() {
  const {
    isAuthenticated,
    cart,
    setIsSidebarOpen,
    isMenuOpen,
    setIsMenuOpen,
    isSearchOpen,
    setIsSearchOpen,
    handleLogout,
  } = useAppContext();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCartClick = () => {
    console.log("Cart clicked, isAuthenticated:", isAuthenticated); // Debug
    if (!isAuthenticated) {
      toast.error("Please log in to view your cart");
      navigate("/auth");
      return;
    }
    setIsSidebarOpen(true); // Mở sidebar giỏ hàng
  };

  const handleUserClick = () => {
    console.log("User Icon clicked"); // Debug
    navigate("/auth");
  };

  const handleSignInClick = () => {
    console.log("Sign In clicked"); // Debug
    navigate("/auth");
  };

  const navigateToBestProducts = () => {
    const bestProductsSection = document.querySelector(
      `.${styles.productListContainer}`
    );
    if (bestProductsSection) {
      bestProductsSection.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const section = document.querySelector(
          `.${styles.productListContainer}`
        );
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  const navigateToBrand = (brand) => {
    console.log(`Navigating to ${brand} products`);
    setShowBrandDropdown(false);
    setIsMenuOpen(false);
    // navigate(`/brand/${brand.toLowerCase()}`);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
      <header
        className={`${styles.header} ${isScrolled ? styles.fixedHeader : ""}`}
      >
        <h1
          className={`${styles.headerTitle} ${
            isScrolled ? styles.showHeaderTitle : ""
          }`}
          onClick={() => navigate("/")}
        >
          TIRA
        </h1>

        <div
          className={`${styles.navMenu} ${isScrolled ? styles.showNav : ""}`}
        >
          <div className={styles.navItem} onClick={navigateToBestProducts}>
            Best Product
          </div>
          <div
            className={styles.navItem}
            onMouseEnter={() => setShowBrandDropdown(true)}
            onMouseLeave={() => setShowBrandDropdown(false)}
          >
            Brand
            {showBrandDropdown && (
              <div className={styles.brandDropdown}>
                <div
                  className={styles.brandItem}
                  onClick={() => navigateToBrand("Gucci")}
                >
                  Gucci
                </div>
                <div
                  className={styles.brandItem}
                  onClick={() => navigateToBrand("Calvin")}
                >
                  Calvin
                </div>
                <div
                  className={styles.brandItem}
                  onClick={() => navigateToBrand("Versace")}
                >
                  Versace
                </div>
                <div
                  className={styles.brandItem}
                  onClick={() => navigateToBrand("Zara")}
                >
                  Zara
                </div>
              </div>
            )}
          </div>
          <div className={styles.navItem} onClick={() => navigate("/stores")}>
            Store System
          </div>
          <div className={styles.navItem} onClick={() => navigate("/vouchers")}>
            Voucher
          </div>
          <div className={styles.navItem} onClick={() => navigate("/news")}>
            News
          </div>
        </div>

        <div className={`${styles.iconBox} ${isScrolled ? styles.flyUp : ""}`}>
          {isAuthenticated ? (
            <span className={styles.headerIcon} onClick={handleLogout}>
              Logout
            </span>
          ) : (
            <img
              src={userIcon}
              alt="User Icon"
              className={styles.headerIcon}
              onClick={handleUserClick}
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
            onClick={toggleSearch}
          />
          <Search
            isSearchOpen={isSearchOpen}
            setIsSearchOpen={setIsSearchOpen}
          />
          <img
            src={barIcon}
            alt="Menu Icon"
            className={styles.headerIcon}
            onClick={() => setIsMenuOpen(true)}
          />
        </div>
      </header>

      <div className={`${styles.sidebarMenu} ${isMenuOpen ? styles.open : ""}`}>
        <button
          className={styles.closeBtn}
          onClick={() => setIsMenuOpen(false)}
        >
          <img src={closeIcon} alt="Close" />
        </button>
        <ul className={styles.menuList}>
          <li onClick={navigateToBestProducts}>Best Product</li>
          <li
            className={styles.menuItemWithSubmenu}
            onMouseEnter={() => setShowBrandDropdown(true)}
            onMouseLeave={() => setShowBrandDropdown(false)}
          >
            Brand
            {showBrandDropdown && (
              <ul className={styles.submenu}>
                <li onClick={() => navigateToBrand("Gucci")}>Gucci</li>
                <li onClick={() => navigateToBrand("Calvin")}>Calvin</li>
                <li onClick={() => navigateToBrand("Versace")}>Versace</li>
                <li onClick={() => navigateToBrand("Zara")}>Zara</li>
              </ul>
            )}
          </li>
          <li onClick={() => navigate("/stores")}>Store System</li>
          <li onClick={() => navigate("/vouchers")}>Voucher</li>
          {!isAuthenticated ? (
            <li onClick={handleSignInClick}>Sign In</li>
          ) : (
            <li onClick={handleLogout}>Logout</li>
          )}
          <li
            onClick={() => {
              if (isAuthenticated) {
                navigate("/profile");
              } else {
                toast.error("Please log in to view your profile");
                navigate("/auth");
              }
              setIsMenuOpen(false);
            }}
          >
            My Account
          </li>
          <li onClick={() => navigate("/orders")}>My Orders</li>
          <li onClick={() => navigate("/contact")}>Contact Us</li>
        </ul>
      </div>
    </>
  );
}

export default FixedHeader;
