import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./SetNewPassword.css";

function SetNewPasswordPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const emailOrPhone = location.state?.emailOrPhone || "Your email/phone";

  const validatePassword = (password) => {
    return (
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      password.length >= 8 &&
      password.length <= 16 &&
      /^[A-Za-z0-9!@#$%^&*()_+]*$/.test(password)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      setError(
        "Password must be 8-16 characters long, include at least one uppercase and one lowercase letter, and contain only common symbols."
      );
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    console.log("New password set:", password);
    navigate("/auth");
  };

  return (
    <div className="set-new-password-container">
      <div className="set-new-password-box">
        <h2 className="set-new-password-title">Set New Password</h2>
        <p className="set-new-password-desc">
          Create a new password for <span className="highlight">{emailOrPhone}</span>
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            className="password-input"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="password-input"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && <p className="error-message">{error}</p>}

          <ul className="password-requirements">
            <li>At least 1 uppercase letter</li>
            <li>At least 1 lowercase letter</li>
            <li>8-16 characters long</li>
            <li>Only letters, numbers, and common symbols</li>
          </ul>

          <button type="submit" className="confirm-button">Confirm</button>
        </form>
      </div>
    </div>
  );
}

export default SetNewPasswordPage;
