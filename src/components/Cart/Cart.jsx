// Cart.jsx
import styles from "./styles.module.scss";

function Cart({
  isSidebarOpen,
  closeSidebar,
  cart,
  handleUpdateQuantity,
  handleRemoveItem,
}) {
  if (!cart || cart.length === 0) {
    return (
      <div
        className={`${styles.cartSidebar} ${isSidebarOpen ? styles.open : ""}`}
      >
        <div className={styles.header}>
          <h2>Your Cart</h2>
          <button className={styles.closeBtn} onClick={closeSidebar}>
            ×
          </button>
        </div>
        <div className={styles.emptyCart}>
          <p>Your cart is empty</p>
          <button className={styles.shopNowBtn} onClick={closeSidebar}>
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  const total = cart.reduce((acc, item) => acc + item.price * item.stock, 0);

  return (
    <div
      className={`${styles.cartSidebar} ${isSidebarOpen ? styles.open : ""}`}
    >
      <div className={styles.header}>
        <h2>Your Cart ({cart.length})</h2>
        <button className={styles.closeBtn} onClick={closeSidebar}>
          ×
        </button>
      </div>

      <div className={styles.cartItems}>
        {cart.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <img
              src={
                item.imageUrls && item.imageUrls.length > 0
                  ? `http://localhost:8080${item.imageUrls[0]}`
                  : "https://via.placeholder.com/150"
              }
              alt={item.name || "Unnamed Product"}
              className={styles.cartItemImage}
            />
            <div className={styles.cartItemDetails}>
              <h3>{item.name || "Unnamed Product"}</h3>
              <p className={styles.size}>Size: {item.size}</p>
              <div className={styles.priceRow}>
                <span>${item.price.toFixed(2)}</span>
                <div className={styles.quantityControl}>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, Math.max(1, item.stock - 1))
                    }
                  >
                    -
                  </button>
                  <span>{item.stock}</span>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.stock + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className={styles.removeBtn}
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <div className={styles.cartTotal}>
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button className={styles.checkoutButton}>Checkout</button>
        <button className={styles.continueButton} onClick={closeSidebar}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default Cart;
