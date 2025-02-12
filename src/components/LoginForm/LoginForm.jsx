import { useState } from "react";
import styles from "./styles.module.scss";
import { login } from "../../service/authService";

const LoginForm = ({ closeForm }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🔍 Gửi yêu cầu đăng nhập:", { username, password });

    try {
      const userData = await login(username, password);
      console.log("✅ Đăng nhập thành công, user:", userData);

      localStorage.setItem("user", JSON.stringify(userData));
      closeForm();
      window.location.reload();
    } catch (err) {
      console.error("❌ Lỗi đăng nhập:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.submitBtn}>
          Login
        </button>
        <button type="button" className={styles.closeBtn} onClick={closeForm}>
          Close
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
