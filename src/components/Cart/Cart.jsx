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
        <button className={styles.closeBtn} onClick={closeSidebar}>
          &times;
        </button>
        <h2>Your Cart</h2>
        <p>Your cart is empty</p>
      </div>
    );
  }

  const total = cart.reduce((acc, item) => acc + item.price * item.stock, 0);

  return (
    <div
      className={`${styles.cartSidebar} ${isSidebarOpen ? styles.open : ""}`}
    >
      <button className={styles.closeBtn} onClick={closeSidebar}>
        &times;
      </button>
      <h2>Your Cart</h2>
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
            <p>{item.name || "Unnamed Product"}</p>
            <p>Price: ${item.price.toFixed(2)}</p>
            <p>Size: {item.size}</p> {/* Hiển thị size đã chọn */}
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
                onClick={() => handleUpdateQuantity(item.id, item.stock + 1)}
              >
                +
              </button>
              <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
            </div>
          </div>
        </div>
      ))}
      <div className={styles.cartTotal}>
        <h3>Total: ${total.toFixed(2)}</h3>
      </div>
      <div className={styles.cartButtons}>
        <button className={styles.checkoutButton}>Checkout</button>
        <button className={styles.viewProductButton}>View Products</button>
      </div>
    </div>
  );
}

export default Cart;
