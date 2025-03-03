import styles from "./styles.module.scss";

function Cart({ isSidebarOpen, closeSidebar, cart, handleRemoveItem }) {
  return (
    <div
      className={`${styles.cartSidebar} ${isSidebarOpen ? styles.open : ""}`}
    >
      <button className={styles.closeBtn} onClick={closeSidebar}>
        X
      </button>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item) => (
          <div key={item.productId} className={styles.cartItem}>
            <img
              src={item.productImage || "https://via.placeholder.com/150"}
              alt={item.productName}
              className={styles.cartItemImage}
            />
            <div className={styles.cartItemDetails}>
              <p>{item.productName}</p>
              <p>Price: ${item.productPrice}</p>
              <button onClick={() => handleRemoveItem(item.productId)}>
                Remove
              </button>
            </div>
          </div>
        ))
      )}
      <div className={styles.cartTotal}>
        <h3>
          Total: ${cart.reduce((total, item) => total + item.productPrice, 0)}
        </h3>
      </div>
    </div>
  );
}

export default Cart;
