import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

import "./VerifyCode.css";

function VerifyCodePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const emailOrPhone = location.state?.emailOrPhone || "Your email/phone";

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow numbers
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input field if a digit is entered
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move back if pressing Backspace on an empty field
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "Enter" && otp.every((digit) => digit)) {
      // If pressing Enter when OTP is fully entered
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    console.log("Entered OTP:", otpCode);
    if (otpCode.length === 6) {
      navigate("/set-new-password", { state: { emailOrPhone } }); 
    }
  };

  return (
    <div className="verify-code-container">
      <div className="verify-code-box">
        <h2 className="verify-code-title">Enter Verification Code</h2>
        <p className="verify-code-desc">
          A verification code has been sent to {emailOrPhone}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="otp-inputs">
            {otp.map((num, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={num}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="otp-input"
              />
            ))}
          </div>

          <p className="verify-code-desc">Didn't receive the code?</p>

          <p className="verify-code-desc-1">Resend</p>

          <button
            type="submit"
            className="verify-code-btn"
            disabled={otp.includes("")} // Enable only when all 6 digits are entered
          >
            NEXT
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyCodePage;
