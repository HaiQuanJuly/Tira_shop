import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";
import { useAppContext } from "../../Context/AppContext"; // Sử dụng AppContext
import Footer from "../Footer/Footer";

function CheckoutPage() {
  const { cart, fetchCart } = useAppContext(); // Lấy cart từ context
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [voucherDiscount, setVoucherDiscount] = useState(0); // Giảm giá từ voucher
  const shippingFee = 5.0; // Phí vận chuyển cố định (có thể thay đổi)

  // Tính toán tổng tiền
  const subtotal = cart.reduce(
    (sum, item) => sum + item.productPrice * item.quantity,
    0
  );
  const total = subtotal + shippingFee - voucherDiscount;

  // Kiểm tra giỏ hàng khi tải trang
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to proceed to checkout");
      navigate("/auth");
      return;
    }
    fetchCart(); // Đồng bộ giỏ hàng từ server
  }, [navigate, fetchCart]);

  // Xử lý áp dụng voucher (giả lập API)
  const applyVoucher = async () => {
    if (!voucherCode) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:8080/tirashop/voucher/apply",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ voucherCode }),
        }
      );
      const data = await response.json();
      if (data.status === "success") {
        setVoucherDiscount(data.discount || 0); // Giả sử API trả về discount
        toast.success("Voucher applied successfully!");
      } else {
        setVoucherDiscount(0);
        toast.error(data.message || "Invalid voucher code");
      }
    } catch (err) {
      setVoucherDiscount(0);
      toast.error("Error applying voucher");
    } finally {
      setLoading(false);
    }
  };

  // Xử lý đặt hàng
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
          voucherCode: voucherCode || null,
          totalAmount: total, // Gửi tổng tiền để server kiểm tra
        }),
      });
      const data = await response.json();
      if (data.status === "success") {
        toast.success("Order placed successfully!");
        setCart([]); // Xóa giỏ hàng trong context
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
            {/* Cột tóm tắt đơn hàng */}
            <div className={styles.orderSummary}>
              <h2>Order Summary</h2>
              <div className={styles.cartItems}>
                {cart.map((item) => (
                  <div key={item.cartId} className={styles.cartItem}>
                    <img
                      src={
                        item.productImage || "https://via.placeholder.com/60"
                      }
                      alt={item.productName}
                      className={styles.itemImage}
                    />
                    <div className={styles.itemDetails}>
                      <h3>{item.productName}</h3>
                      <p>
                        ${item.productPrice.toFixed(2)} × {item.quantity}
                      </p>
                      <p>Size: {item.size || "N/A"}</p>
                    </div>
                    <p className={styles.itemTotal}>
                      ${(item.productPrice * item.quantity).toFixed(2)}
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

            {/* Cột thông tin thanh toán */}
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
                <div className={styles.formSection}>
                  <h3>Voucher (Optional)</h3>
                  <div className={styles.voucherInput}>
                    <input
                      type="text"
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                      placeholder="Enter voucher code"
                      className={styles.voucherField}
                    />
                    <button
                      type="button"
                      onClick={applyVoucher}
                      disabled={loading || !voucherCode}
                      className={styles.applyVoucherBtn}
                    >
                      Apply
                    </button>
                  </div>
                </div>
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
      <Footer></Footer>
    </>
  );
}

export default CheckoutPage;
