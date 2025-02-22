import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    firstname: "",
    lastname: "",
    gender: "Male",
    birthday: "",
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
      : "http://localhost:8080/tirashop/auth/register-new-user";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.code === 200) {
        if (isLogin) {
          localStorage.setItem("token", data.data.token);
          navigate("/");
        } else {
          alert("Registered successfully! Please log in.");
          setIsLogin(true);
        }
      } else {
        setError(data.message || "Error");
      }
    } catch (err) {
      setError("Error connecting to server!");
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2>{isLogin ? "Login" : "RegisterRegister"}</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleAuth}>
        {!isLogin && (
          <>
            <input
              type="text"
              name="firstname"
              placeholder="FirstName"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastname"
              placeholder="LastNameLastName"
              value={formData.lastname}
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
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="birthday"
              placeholder="Birthday"
              value={formData.birthday}
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
          placeholder="PasswordPassword"
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
