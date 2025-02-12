import { useState, useEffect, useRef } from "react";
import BoxIcon from "./BoxIcon/BoxIcon";
import Menu from "./Menu/Menu";
import { dataBoxIcon, dataMenu } from "./constants";
import styles from "./styles.module.scss";
import Logo from "../../assets/icons/images/Logo-retina.png";
import heartIcon from "../../assets/icons/svgs/heartIcon.svg";
import searchIcon from "../../assets/icons/svgs/searchIcon.svg";
import cartIcon from "../../assets/icons/svgs/cartIcon.svg";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import { logout, getCurrentUser } from "../../service/authService";

function MyHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setIsLoggedIn(true);
      setUsername(user.username);
    }
  }, []);

  const handleOpenPanel = (isLoginMode) => {
    setIsLogin(isLoginMode);
    setShowPanel(true);
    document.body.classList.add("no-scroll");
  };

  const handleClosePanel = () => {
    setShowPanel(false);
    document.body.classList.remove("no-scroll");
  };

  const handleLoginSuccess = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setIsLoggedIn(true);
    setUsername(userData.username);
    setShowPanel(false);
    document.body.classList.remove("no-scroll");
  };

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUsername("");
    window.location.reload(); // Reload để cập nhật UI
  };

  const handleSearchClick = () => {
    setShowSearch(true);
    setTimeout(() => {
      searchRef.current?.focus();
    }, 100);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    const handleEscPress = (event) => {
      if (event.key === "Escape") {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscPress);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscPress);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.containerHeader}>
        <div className={styles.containerBox}>
          <div className={styles.containerBoxIcon}>
            {dataBoxIcon.map((item) => (
              <BoxIcon key={item.type} type={item.type} href={item.href} />
            ))}
          </div>
          <div className={styles.containerMenu}>
            {dataMenu.map((item) => (
              <Menu
                key={item.content}
                content={item.content}
                href={item.href}
              />
            ))}
          </div>
        </div>

        <div>
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "153px", height: "53px" }}
          />
        </div>

        <div className={styles.containerBox}>
          {!showSearch && (
            <div className={styles.containerMenu}>
              {isLoggedIn ? (
                <>
                  <div className={styles.menu} style={{ fontWeight: "bold" }}>
                    {username}
                  </div>
                  <div
                    className={styles.menu}
                    onClick={handleLogout}
                    style={{ color: "red" }}
                  >
                    Logout
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={styles.menu}
                    onClick={() => handleOpenPanel(true)}
                  >
                    Sign In
                  </div>
                  <div
                    className={styles.menu}
                    onClick={() => handleOpenPanel(false)}
                  >
                    Register
                  </div>
                </>
              )}
            </div>
          )}

          {!showSearch && (
            <div className={styles.containerBoxIcon}>
              <img width={26} height={26} src={heartIcon} alt="heartIcon" />
              <img width={26} height={26} src={cartIcon} alt="cartIcon" />
            </div>
          )}

          {/* Search Icon */}
          <img
            width={26}
            height={26}
            src={searchIcon}
            alt="searchIcon"
            onClick={handleSearchClick}
            className={styles.searchIcon}
          />
        </div>
      </div>

      {/* Ô tìm kiếm */}
      {showSearch && (
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            ref={searchRef}
            className={styles.searchInput}
          />
        </div>
      )}

      {/* Overlay */}
      {showPanel && (
        <div className={styles.slideOverlay} onClick={handleClosePanel}></div>
      )}

      {/* Panel đăng nhập/đăng ký */}
      <div
        className={`${styles.slidePanel} ${
          showPanel ? styles.slidePanelOpen : ""
        }`}
      >
        <button className={styles.closeTab} onClick={handleClosePanel}>
          ✖
        </button>
        {isLogin ? (
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        ) : (
          <RegisterForm onRegisterSuccess={handleOpenPanel} />
        )}
      </div>
    </div>
  );
}

export default MyHeader;
