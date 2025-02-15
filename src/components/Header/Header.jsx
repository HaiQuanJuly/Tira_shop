import { useState, useEffect, useRef } from "react";
import Menu from "./Menu/Menu";
import { dataMenu } from "./constants";
import styles from "./styles.module.scss";
import Logo from "../../assets/icons/images/Logo-retina.png";
import userIcon from "../../assets/icons/svgs/userIcon.svg";
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
  const [showUserMenu, setShowUserMenu] = useState(false); // Trạng thái hover vào userIcon
  const [showShopName, setShowShopName] = useState(true); // Trạng thái tên shop
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
    setShowPanel(true); // Mở form
    document.body.classList.add("no-scroll"); // Ngừng cuộn trang khi form mở
  };

  const handleClosePanel = () => {
    setShowPanel(false); // Đóng form
    document.body.classList.remove("no-scroll"); // Khôi phục cuộn trang
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
    setShowShopName(false); // Ẩn tên shop khi click vào search
    setTimeout(() => {
      searchRef.current?.focus();
    }, 100);
  };

  const handleSearchBlur = () => {
    setShowShopName(true); // Hiện lại tên shop khi bỏ ra ngoài
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
        setShowShopName(true); // Hiện lại tên shop khi click ra ngoài
      }
    };

    const handleEscPress = (event) => {
      if (event.key === "Escape") {
        setShowSearch(false);
        setShowShopName(true); // Hiện lại tên shop khi nhấn ESC
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
          {/* <div className={styles.containerBoxIcon}>
            {dataBoxIcon.map((item) => (
              <BoxIcon key={item.type} type={item.type} href={item.href} />
            ))}
          </div> */}
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
          {showShopName && (
            <img
              src={Logo}
              alt="Logo"
              style={{ width: "153px", height: "53px" }}
            />
          )}
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
                <div
                  className={styles.menu}
                  onMouseEnter={() => setShowUserMenu(true)} // Khi hover vào userIcon, show menu
                  onMouseLeave={() => setShowUserMenu(false)} // Khi rời khỏi icon, ẩn menu
                >
                  <img src={userIcon} alt="userIcon" width={26} height={26} />
                  {showUserMenu && (
                    <div className={styles.userMenu}>
                      <button
                        className={styles.loginPanel}
                        onClick={() => handleOpenPanel(true)}
                      >
                        Login
                      </button>
                      <button
                        className={styles.registerPanel}
                        onClick={() => handleOpenPanel(false)}
                      >
                        Register
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div className={styles.containerBoxIcon}>
            {/* User Icon ở chỗ cart */}
            <img width={26} height={26} src={cartIcon} alt="cartIcon" />
            {/* Cart Icon ở chỗ search */}
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
      </div>

      {/* Ô tìm kiếm */}
      {showSearch && (
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search product..."
            ref={searchRef}
            className={styles.searchInput}
            onBlur={handleSearchBlur} // Khi click ra ngoài ô tìm kiếm, tên shop sẽ hiện lại
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
