// src/components/Checkout/CheckoutPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";
import { useAppContext } from "../../context/AppContext";
import Footer from "../Footer/Footer";
import VoucherForm from "../Voucher/VoucherForm";

function CheckoutPage() {
  const { cart, fetchCart, setCart } = useAppContext();
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const shippingFee = 5.0;

  useEffect(() => {
    console.log("Cart in CheckoutPage:", cart); // Debug
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to proceed to checkout");
      navigate("/auth");
      return;
    }
    fetchCart();
  }, [navigate, fetchCart]);

  const subtotal = cart.reduce(
    (sum, item) => sum + (item.productPrice || 0) * (item.quantity || 0),
    0
  );
  const total = subtotal + shippingFee - voucherDiscount;

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    if (!shippingAddress.trim()) {
      toast.error("Please enter a shipping address");
      return;
    }

    const confirmCheckout = window.confirm(
      "Are you sure you want to place this order?"
    );
    if (!confirmCheckout) return;

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/tirashop/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          shippingAddress,
          voucherCode: voucherDiscount > 0 ? voucherCode : null, // Gửi mã voucher nếu áp dụng
          totalAmount: total,
        }),
      });
      const data = await response.json();
      if (data.status === "success") {
        toast.success("Order placed successfully!");
        setCart([]);
        setTimeout(() => navigate("/"), 1500);
      } else {
        setError(data.message || "Checkout failed");
        toast.error(data.message || "Checkout failed");
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.checkoutPage}>
        <h1>Checkout</h1>
        {cart.length === 0 ? (
          <p className={styles.emptyCart}>
            Your cart is empty. Add items to proceed.
          </p>
        ) : (
          <div className={styles.checkoutContainer}>
            <div className={styles.orderSummary}>
              <h2>Order Summary</h2>
              <div className={styles.cartItems}>
                {cart.map((item) => (
                  <div key={item.cartId} className={styles.cartItem}>
                    <img
                      src={
                        item.productImage || "https://via.placeholder.com/60"
                      }
                      alt={item.productName || "Product"}
                      className={styles.itemImage}
                    />
                    <div className={styles.itemDetails}>
                      <h3>{item.productName || "Unknown Product"}</h3>
                      <p>
                        ${(item.productPrice || 0).toFixed(2)} ×{" "}
                        {item.quantity || 0}
                      </p>
                      <p>Size: {item.size || "N/A"}</p>
                    </div>
                    <p className={styles.itemTotal}>
                      $
                      {(
                        (item.productPrice || 0) * (item.quantity || 0)
                      ).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <div className={styles.summaryDetails}>
                <p>
                  <span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span>
                </p>
                <p>
                  <span>Shipping Fee:</span>{" "}
                  <span>${shippingFee.toFixed(2)}</span>
                </p>
                <p>
                  <span>Voucher Discount:</span>{" "}
                  <span>-${voucherDiscount.toFixed(2)}</span>
                </p>
                <h3>
                  <span>Total:</span> <span>${total.toFixed(2)}</span>
                </h3>
              </div>
            </div>
            <div className={styles.checkoutFormContainer}>
              <h2>Shipping & Payment</h2>
              <form onSubmit={handleCheckout} className={styles.checkoutForm}>
                <div className={styles.formSection}>
                  <h3>Shipping Address</h3>
                  <textarea
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="Enter your full shipping address"
                    required
                    rows="4"
                    className={styles.addressInput}
                  />
                </div>
                <VoucherForm
                  subtotal={subtotal}
                  setVoucherDiscount={setVoucherDiscount}
                  voucherCode={voucherCode}
                  setVoucherCode={setVoucherCode}
                />
                {error && <p className={styles.errorMessage}>{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className={styles.placeOrderBtn}
                >
                  {loading ? "Processing..." : "Place Order"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default CheckoutPage;
