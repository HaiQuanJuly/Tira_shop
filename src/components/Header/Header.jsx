import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";
import userIcon from "../../assets/icons/svgs/userIcon.svg";
import cartIcon from "../../assets/icons/svgs/cartIcon.svg";
import searchIcon from "../../assets/icons/svgs/searchIcon.svg";
import barIcon from "../../assets/icons/svgs/bar.svg";
import closeIcon from "../../assets/icons/svgs/close.svg";
import bannerGucci from "../../assets/icons/images/bannerGucci.png";
import ProductList from "../ProductItem/ProductList";
import Cart from "../Cart/Cart";
import Search from "../Search/Search"; // Import Search component


function MyHeader() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const [showSidebarBrandDropdown, setShowSidebarBrandDropdown] =useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    if (token) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setCart([]);
        setIsAuthenticated(false);
        return;
      }

      const response = await fetch("http://localhost:8080/tirashop/cart/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setCart([]);
        toast.error("Your session has expired. Please log in again.", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/auth");
        return;
      }

      const data = await response.json();
      if (data.status === "success") {
        const validSizes = ["S", "M", "L"];
        const parsedCart = (data.data.items || []).map((item) => ({
          ...item,
          cartId: parseInt(item.cartId),
          productId: parseInt(item.productId),
          size: validSizes.includes(item.size) ? item.size : "M",
          productImage: item.productImage
            ? `http://localhost:8080${item.productImage}`
            : null,
        }));
        setCart(parsedCart);
        console.log("Fetched cart:", parsedCart);
      } else {
        console.error("Failed to fetch cart:", data.message);
        setCart([]);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart([]);
    }
  };

  const handleAddToCart = async (product, selectedSize) => {
    if (!isAuthenticated) {
      toast.error("Please log in to add items to cart", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/auth");
      return;
    }

    setIsAdding(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        toast.error("Please log in to add items to cart", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/auth");
        return;
      }

      const validSizes = ["S", "M", "L"];
      if (!validSizes.includes(selectedSize)) {
        toast.error("Invalid size. Please select S, M, or L.", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      const parsedProductId = parseInt(product.id);
      if (isNaN(parsedProductId)) {
        toast.error("Invalid product ID", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      console.log("Adding to cart with:", {
        productId: parsedProductId,
        quantity: 1,
        size: selectedSize,
      });

      const response = await fetch("http://localhost:8080/tirashop/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: parsedProductId,
          quantity: 1,
          size: selectedSize,
        }),
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        toast.error("Your session has expired. Please log in again.", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/auth");
        return;
      }

      const data = await response.json();
      console.log("Response from add to cart:", data);

      if (data.status === "success") {
        await fetchCart();
        setIsSidebarOpen(true);
        toast.success("Product added to cart!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error(`Failed to add to cart: ${data.message}`, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Error adding to cart. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsAdding(false);
    }
  };

  const handleCartClick = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to view your cart", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/auth");
      return;
    }
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setIsMenuOpen(false);
    setCart([]);
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
    navigate("/");
  };

  const handleUpdateQuantity = async (cartId, productId, newQuantity, size) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        toast.error("Please log in to update cart", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/auth");
        return;
      }

      const parsedCartId = parseInt(cartId);
      const parsedProductId = parseInt(productId);
      if (isNaN(parsedCartId) || isNaN(parsedProductId)) {
        toast.error("Invalid cart ID or product ID", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      if (newQuantity < 1) {
        toast.error("Quantity must be at least 1", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      const validSizes = ["S", "M", "L"];
      if (!validSizes.includes(size)) {
        toast.error("Invalid size. Please select S, M, or L.", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      console.log("Updating cart with:", {
        cartId: parsedCartId,
        productId: parsedProductId,
        quantity: newQuantity,
        size,
      });

      const response = await fetch(
        "http://localhost:8080/tirashop/cart/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            cartId: parsedCartId,
            productId: parsedProductId,
            quantity: newQuantity,
            size: size,
          }),
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        toast.error("Your session has expired. Please log in again.", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/auth");
        return;
      }

      const data = await response.json();
      console.log("Response from update quantity:", data);

      if (data.status === "success") {
        await fetchCart();
        toast.success("Quantity updated!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error(`Failed to update quantity: ${data.message}`, {
          position: "top-right",
          autoClose: 3000,
        });
        await fetchCart();
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Error updating quantity. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
      await fetchCart();
    }
  };

  const handleRemoveItem = async (cartId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        toast.error("Please log in to remove items from cart", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/auth");
        return;
      }

      const parsedCartId = parseInt(cartId);
      if (isNaN(parsedCartId)) {
        toast.error("Invalid cart ID", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      console.log("Removing item with cartId:", parsedCartId);
      console.log("Token being sent:", token);

      const response = await fetch(
        `http://localhost:8080/tirashop/cart/remove/${parsedCartId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 401 || response.status === 400) {
        const data = await response.json();
        console.log("Error response:", data);
        if (
          data.message.includes("User must be logged in") ||
          response.status === 401
        ) {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          toast.error("Your session has expired. Please log in again.", {
            position: "top-right",
            autoClose: 3000,
          });
          navigate("/auth");
          return;
        }
        throw new Error(data.message);
      }

      const data = await response.json();
      console.log("Response from remove item:", data);

      if (data.status === "success") {
        await fetchCart();
        toast.success("Item removed from cart!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error(`Failed to remove item: ${data.message}`, {
          position: "top-right",
          autoClose: 3000,
        });
        await fetchCart();
      }
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error(
        `Error removing item: ${error.message || "Please try again."}`,
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
      await fetchCart();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateToBestProducts = () => {
    // Navigate to best products page or scroll to best products section
    const bestProductsSection = document.querySelector(
      `.${styles.productListContainer}`
    );
    if (bestProductsSection) {
      bestProductsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Added brand navigation function
  const navigateToBrand = (brand) => {
    console.log(`Navigating to ${brand} products`);
    // Implement brand navigation logic here
    setShowBrandDropdown(false);
    setShowSidebarBrandDropdown(false);
    setIsMenuOpen(false);
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

        {/* Navigation Menu */}
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
          <div className={styles.navItem}>Store System</div>
          <div className={styles.navItem}>Voucher</div>
        </div>

        <div className={`${styles.iconBox} ${isScrolled ? styles.flyUp : ""}`}>
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
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          />
          {/* Gọi Search component */}
      <Search isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
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
        setCart={setCart}
        handleUpdateQuantity={handleUpdateQuantity}
        handleRemoveItem={handleRemoveItem}
        fetchCart={fetchCart}
        navigate={navigate}
      />

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
            onClick={() =>
              setShowSidebarBrandDropdown(!showSidebarBrandDropdown)
            }
          >
            Brand {showSidebarBrandDropdown ? "▲" : "▼"}
            {showSidebarBrandDropdown && (
              <ul className={styles.submenu}>
                <li onClick={() => navigateToBrand("Gucci")}>Gucci</li>
                <li onClick={() => navigateToBrand("Calvin")}>Calvin</li>
                <li onClick={() => navigateToBrand("Versace")}>Versace</li>
                <li onClick={() => navigateToBrand("Zara")}>Zara</li>
              </ul>
            )}
          </li>
          <li>Store System</li>
          <li>Voucher</li>
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

      <ProductList
        handleAddToCart={handleAddToCart}
        isAuthenticated={isAuthenticated}
      />
    </>
  );
}

export default MyHeader;
