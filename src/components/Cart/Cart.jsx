import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";

function Cart({
  isSidebarOpen,
  closeSidebar,
  cart,
  setCart,
  handleUpdateQuantity,
  handleRemoveItem,
  fetchCart,
  navigate,
}) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.productPrice * item.quantity,
    0
  );

  const handleQuantityChange = async (cartId, delta) => {
    // Đồng bộ giỏ hàng trước khi thực hiện thao tác
    await fetchCart();

    // Kiểm tra lại cart sau khi đồng bộ
    const item = cart.find((i) => i.cartId === cartId);
    if (!item) {
      toast.error("Cart item not found. Please refresh the cart.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const validSizes = ["S", "M", "L"];
    if (!validSizes.includes(item.size)) {
      toast.error("Invalid size. Please select S, M, or L.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const newQuantity = item.quantity + delta;
    if (newQuantity > 0) {
      await handleUpdateQuantity(
        item.cartId,
        item.productId,
        newQuantity,
        item.size
      );
    }
  };

  const handleCheckoutClick = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setIsCheckingOut(true);
    setTimeout(() => {
      closeSidebar();
      navigate("/checkout");
      setIsCheckingOut(false);
    }, 1000);
  };

  const handleClearCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to clear cart", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/auth");
        return;
      }

      const response = await fetch(
        "http://localhost:8080/tirashop/cart/clear",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log("Response from clear cart:", data);

      if (data.status === "success") {
        await fetchCart();
        toast.success("Cart cleared successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        closeSidebar();
      } else {
        toast.error(`Failed to clear cart: ${data.message}`, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Error clearing cart. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleRemove = async (cartId) => {
    await fetchCart();
    const item = cart.find((i) => i.cartId === cartId);
    if (!item) {
      toast.error("Cart item not found. Please refresh the cart.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    await handleRemoveItem(cartId);
  };

  return (
    <div
      className={`${styles.cartSidebar} ${isSidebarOpen ? styles.open : ""}`}
    >
      <div className={styles.cartHeader}>
        <h2>Your Cart</h2>
        <button onClick={closeSidebar} className={styles.closeBtn}>
          Close
        </button>
      </div>
      <div className={styles.cartItems}>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <button onClick={handleClearCart} className={styles.clearCartBtn}>
              Clear Cart
            </button>
            {cart.map((item) => (
              <div key={item.cartId} className={styles.cartItem}>
                <img
                  src={item.productImage || "https://via.placeholder.com/80"}
                  alt={item.productName}
                  className={styles.cartItemImage}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/80"; // Hình ảnh placeholder nếu tải lỗi
                  }}
                />
                <div className={styles.cartItemDetails}>
                  <h4>{item.productName}</h4>
                  <p>Price: ${item.productPrice.toFixed(2)}</p>
                  <p>Size: {item.size || "N/A"}</p>
                  <div className={styles.quantityControl}>
                    <button
                      onClick={() => handleQuantityChange(item.cartId, -1)}
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() => handleQuantityChange(item.cartId, 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemove(item.cartId)}
                    className={styles.removeBtn}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <div className={styles.cartFooter}>
        <h3>Total: ${total.toFixed(2)}</h3>
        {cart.length > 0 && (
          <button
            onClick={handleCheckoutClick}
            className={styles.checkoutBtn}
            disabled={isCheckingOut}
          >
            {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Cart;
