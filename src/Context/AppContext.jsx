import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { toast } from "react-toastify";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFetchingCart, setIsFetchingCart] = useState(false);

  // Hàm fetchCart với memoization
  const fetchCart = useCallback(async () => {
    if (isFetchingCart || !isAuthenticated) return; // Tránh gọi khi đang fetch hoặc chưa đăng nhập
    setIsFetchingCart(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setCart([]);
        setIsAuthenticated(false);
        return;
      }

      const response = await fetch("http://localhost:8080/tirashop/cart/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setCart([]);
        toast.error("Your session has expired. Please log in again.");
        return;
      }

      const data = await response.json();
      console.log("Fetch cart response:", data); // Debug
      if (data.status === "success" && data.data && data.data.items) {
        const validSizes = ["S", "M", "L"];
        const parsedCart = data.data.items.map((item) => ({
          id: item.id,
          cartId: parseInt(item.cartId),
          productId: parseInt(item.productId),
          productName: item.productName,
          productPrice: parseFloat(item.productPrice) || 0,
          quantity: parseInt(item.quantity) || 0,
          size: validSizes.includes(item.size) ? item.size : "M",
          productImage: item.productImage
            ? `http://localhost:8080${item.productImage}`
            : null,
        }));
        setCart(parsedCart);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart([]);
      toast.error("Failed to fetch cart. Please try again.");
    } finally {
      setIsFetchingCart(false);
    }
  }, [isAuthenticated]); // Chỉ phụ thuộc vào isAuthenticated

  // Kiểm tra trạng thái đăng nhập khi khởi tạo
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); // fetchCart sẽ được gọi qua useEffect thứ hai
    } else {
      setIsAuthenticated(false);
      setCart([]);
    }
  }, []); // Chỉ chạy một lần khi khởi tạo

  // Gọi fetchCart khi isAuthenticated thay đổi
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated, fetchCart]); // fetchCart đã được memoized

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setCart([]);
    setIsSidebarOpen(false);
    setIsMenuOpen(false);
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
};

export const useAppContext = () => useContext(AppContext);
