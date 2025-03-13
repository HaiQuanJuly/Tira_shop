// src/context/AppContext.js
import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Kiểm tra token khi ứng dụng khởi động
      fetch("http://localhost:8080/tirashop/auth/validate-token", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setIsAuthenticated(
            response.status === 200 && data.status === "success"
          );
          if (data.status === "success") fetchCart(); // Tải giỏ hàng nếu đã xác thực
        })
        .catch(() => setIsAuthenticated(false));
    }
  }, []);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("http://localhost:8080/tirashop/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.status === "success") setCart(data.data || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
    setCart([]);
    toast.success("Logged out successfully!");
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        cart,
        setCart,
        isSidebarOpen,
        setIsSidebarOpen,
        isMenuOpen,
        setIsMenuOpen,
        isSearchOpen,
        setIsSearchOpen,
        fetchCart,
        handleLogout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
