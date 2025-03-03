import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Components from "../Auth/Component.js";

function AuthPage() {
  const [signIn, setSignIn] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");

    const url = signIn
      ? "http://localhost:8080/tirashop/auth/login"
      : "http://localhost:8080/tirashop/auth/register-new-user"; // Đảm bảo URL đúng với yêu cầu API

    try {
      const payload = signIn
        ? { username: formData.username, password: formData.password }
        : {
            username: formData.username,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            email: formData.email,
            phone: formData.phoneNumber, // Đảm bảo rằng trường "phone" là chính xác
            firstName: formData.firstName,
            lastName: formData.lastName,
            gender: formData.gender,
            dateOfBirth: formData.dateOfBirth, // Đảm bảo ngày tháng đúng định dạng
          };

      console.log("Sending data to API:", payload); // Kiểm tra dữ liệu gửi lên server

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Response Status:", response.status); // Kiểm tra status code từ server
      console.log("Response Data:", data); // Kiểm tra dữ liệu phản hồi từ server

      if (response.status === 200) {
        if (signIn) {
          localStorage.setItem("token", data.data.token); // Lưu token sau khi đăng nhập thành công
          navigate("/"); // Điều hướng về trang chính
        } else {
          alert(
            `Registration Successful! Welcome, ${data.data.firstname} ${data.data.lastname}`
          );
          setSignIn(true); // Chuyển về trang đăng nhập
        }
      } else {
        setError(data.message || "Authentication failed.");
      }
    } catch (err) {
      console.error("Error connecting to server:", err); // In lỗi kết nối server
      setError("Error connecting to server!");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f6f5f7",
      }}
    >
      <Components.Container>
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form onSubmit={handleAuth}>
            <Components.Title>Create Account</Components.Title>
            <Components.Input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <Components.Input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <Components.Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Components.Input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <Components.Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Components.Select>
            <Components.Input
              type="date"
              name="dateOfBirth"
              placeholder="Date of Birth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
            <Components.Input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <Components.Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Components.Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {error && (
              <Components.ErrorMessage>{error}</Components.ErrorMessage>
            )}
            <Components.Button type="submit">Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signinIn={signIn}>
          <Components.Form onSubmit={handleAuth}>
            <Components.Title>Sign in</Components.Title>
            <Components.Input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <Components.Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {error && (
              <Components.ErrorMessage>{error}</Components.ErrorMessage>
            )}
            <Components.Anchor href="#">
              Forgot your password?
            </Components.Anchor>
            <Components.Button type="submit">Sign In</Components.Button>
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signinIn={signIn}>
          <Components.Overlay signinIn={signIn}>
            <Components.LeftOverlayPanel signinIn={signIn}>
              <Components.Title>Tira Shop</Components.Title>
              <Components.Paragraph>
                To keep connected with us, please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => setSignIn(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>
            <Components.RightOverlayPanel signinIn={signIn}>
              <Components.Title>Tira Shop</Components.Title>
              <Components.Paragraph>
                Enter your personal details and start your journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => setSignIn(false)}>
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  );
}

export default AuthPage;
