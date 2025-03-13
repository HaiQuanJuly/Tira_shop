// src/components/Cart/Cart.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";
import { useAppContext } from "../../Context/AppContext";

function Cart() {
  const { isSidebarOpen, setIsSidebarOpen, cart, fetchCart } = useAppContext();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.productPrice * item.quantity,
    0
  );

  const closeSidebar = () => setIsSidebarOpen(false);

  const handleQuantityChange = async (cartItem) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to update your cart");
      closeSidebar();
      navigate("/auth");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/tirashop/cart/update",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: cartItem.id,
            cartId: cartItem.cartId,
            quantity: cartItem.quantity,
            productSize: cartItem.productSize,
          }),
        }
      );

      const data = await response.json();
      if (response.status === 401) {
        localStorage.removeItem("token");
        toast.error("Your session has expired. Please log in again.");
        navigate("/auth");
        return;
      }
      if (data.status === "success") {
        toast.success("Cart updated successfully!");
        await fetchCart();
      } else {
        toast.error(`Failed to update cart: ${data.message}`);
      }
    } catch (error) {
      toast.error("Error updating cart. Please try again.");
    }
  };

  // Áp dụng tương tự cho `handleRemoveItem` và `clearCart`
  const handleRemoveItem = async (cartId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to remove items from cart");
      navigate("/auth");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/tirashop/cart/remove/${cartId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (response.status === 401) {
        localStorage.removeItem("token");
        toast.error("Your session has expired. Please log in again.");
        navigate("/auth");
        return;
      }

      if (data.status === "success") {
        toast.success("Item removed from cart!");
        await fetchCart();
      } else {
        toast.error(`Failed to remove item: ${data.message}`);
      }
    } catch (error) {
      toast.error("Error removing item. Please try again.");
    }
  };

  const clearCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to clear your cart");
      closeSidebar();
      navigate("/auth");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/tirashop/cart/clear",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.status === "success") {
        toast.success("Cart cleared successfully!");
        await fetchCart();
      } else {
        toast.error(`Failed to clear cart: ${data.message}`);
      }
    } catch (error) {
      toast.error("Error clearing cart. Please try again.");
    }
  };

  return (
    <div
      className={`${styles.cartSidebar} ${isSidebarOpen ? styles.open : ""}`}
    >
      <div className={styles.cartHeader}>
        <h2>Your Cart ({cart.length})</h2>
        <button className={styles.closeButton} onClick={closeSidebar}>
          ×
        </button>
      </div>

      <div className={styles.cartItems}>
        {cart.length === 0 ? (
          <p className={styles.emptyMessage}>Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item.cartId} className={styles.cartItem}>
              <img
                src={item.productImage || "https://via.placeholder.com/80"}
                alt={item.productName}
                className={styles.productImage}
              />
              <div className={styles.itemDetails}>
                <h4>{item.productName}</h4>
                <p className={styles.price}>
                  ${item.productPrice.toFixed(2)} × {item.quantity}
                </p>
                <div className={styles.quantityControls}>
                  <button
                    onClick={() =>
                      handleQuantityChange({
                        ...item,
                        quantity: item.quantity - 1,
                      })
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange({
                        ...item,
                        quantity: item.quantity + 1,
                      })
                    }
                  >
                    +
                  </button>
                </div>
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemoveItem(item.cartId)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className={styles.cartFooter}>
          <div className={styles.total}>
            <span>Total:</span>
            <h3>${total.toFixed(2)}</h3>
          </div>
          <div className={styles.footerButtons}>
            <button onClick={clearCart} className={styles.clearCartButton}>
              Clear Cart
            </button>
            <button
              onClick={() => navigate("/checkout")}
              className={styles.checkoutButton}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? "Processing..." : "Checkout"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
