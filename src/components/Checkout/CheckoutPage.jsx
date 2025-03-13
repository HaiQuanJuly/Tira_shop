import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";
import Footer from "../Footer/Footer";

function CheckoutPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [shippingAddress, setShippingAddress] = useState("");
  const [voucherId, setVoucherId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please log in to proceed to checkout", {
            position: "top-right",
            autoClose: 3000,
          });
          navigate("/auth");
          return;
        }

        const response = await fetch(
          "http://localhost:8080/tirashop/cart/list",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data.status === "success") {
          setCart(data.data.items || []);
        } else {
          setError(data.message || "Failed to fetch cart");
          toast.error(data.message || "Failed to fetch cart", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      } catch (err) {
        setError(err.message);
        toast.error(err.message, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    };
    fetchCart();
  }, [navigate]);

  const total = cart.reduce(
    (sum, item) => sum + item.productPrice * item.quantity,
    0
  );

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to proceed to checkout", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/auth");
        return;
      }

      const response = await fetch("http://localhost:8080/tirashop/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          shippingAddress,
          voucherId: voucherId || "",
        }),
      });
      const data = await response.json();
      if (data.status === "success") {
        toast.success("Checkout successful! Your order has been placed.", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setError(data.message || "Checkout failed");
        toast.error(data.message || "Checkout failed", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.checkoutContainer}>
        <h2>Checkout</h2>
        {cart.length === 0 ? (
          <p className={styles.emptyCartMessage}>
            Your cart is empty. Please add items to proceed.
          </p>
        ) : (
          <div className={styles.checkoutContent}>
            <div className={styles.cartSummary}>
              <h3>Order Summary</h3>
              {cart.map((item) => (
                <div key={item.cartId} className={styles.cartItem}>
                  <img
                    src={item.productImage || "https://via.placeholder.com/50"}
                    alt={item.productName}
                    className={styles.cartItemImage}
                  />
                  <div className={styles.cartItemDetails}>
                    <h4>{item.productName}</h4>
                    <p>Price: ${item.productPrice.toFixed(2)}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size || "N/A"}</p>
                  </div>
                </div>
              ))}
              <h3 className={styles.total}>Total: ${total.toFixed(2)}</h3>
            </div>

            <form onSubmit={handleCheckout} className={styles.checkoutForm}>
              <h3>Shipping Information</h3>
              <div className={styles.formGroup}>
                <label htmlFor="shippingAddress">Shipping Address</label>
                <textarea
                  id="shippingAddress"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  required
                  placeholder="Enter your shipping address"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="voucherId">Voucher Code (Optional)</label>
                <input
                  id="voucherId"
                  type="text"
                  value={voucherId}
                  onChange={(e) => setVoucherId(e.target.value)}
                  placeholder="Enter voucher code"
                />
              </div>
              {error && <p className={styles.error}>{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className={styles.submitBtn}
              >
                {loading ? "Processing..." : "Place Order"}
              </button>
            </form>
          </div>
        )}
      </div>
      <Footer></Footer>
    </>
  );
}

export default CheckoutPage;
