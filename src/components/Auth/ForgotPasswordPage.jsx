import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPasswordPage() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User entered:", emailOrPhone);
    navigate("/verify-code", { state: { emailOrPhone } }); // Điều hướng đến trang nhập mã xác nhận
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2 className="forgot-password-title">🔑 Reset password</h2>
        <p className="forgot-password-desc">
        Enter your email to receive password reset instructions.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            required
            className="forgot-password-input"
          />
          <button type="submit" className="forgot-password-btn">
            Tiếp theo
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
