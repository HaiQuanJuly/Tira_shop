import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "", // Đổi thành phoneNumber theo API
    firstName: "", // Đổi thành firstName
    lastName: "", // Đổi thành lastName
    gender: "Male",
    dateOfBirth: "", // Đổi thành dateOfBirth theo API
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");

    const url = isLogin
      ? "http://localhost:8080/tirashop/auth/login"
      : "http://localhost:8080/tirashop/auth/register";

    try {
      const payload = isLogin
        ? { username: formData.username, password: formData.password }
        : {
            username: formData.username,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            email: formData.email,
            phone: formData.phone,
            firstName: formData.firstName,
            lastName: formData.lastName,
            gender: formData.gender,
            dateOfBirth: formData.dateOfBirth,
          };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.status === 200) {
        if (isLogin) {
          localStorage.setItem("token", data.data.token);
          navigate("/");
        } else {
          alert("Registered successfully! Please log in.");
          setIsLogin(true);
        }
      } else if (
        response.status === 400 &&
        data.message.includes("Username already exists")
      ) {
        setError("This username is already taken. Please choose another one.");
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      setError("Error connecting to server!");
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleAuth}>
        {!isLogin && (
          <>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="date"
              name="dateOfBirth"
              placeholder="Date of Birth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </>
        )}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
      <p onClick={() => setIsLogin(!isLogin)} className={styles.toggleText}>
        {isLogin
          ? "Don't have an account yet? Register now!"
          : "Already have an account? Log in!"}
      </p>
    </div>
  );
}

export default AuthPage;
