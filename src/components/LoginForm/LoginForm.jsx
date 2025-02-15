import { useState } from "react";
import styles from "./styles.module.scss"; // import đúng file SCSS
import { login } from "../../service/authService";

const LoginForm = ({ closeForm, goToRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login(username, password);
      localStorage.setItem("user", JSON.stringify(userData));
      if (typeof closeForm === "function") {
        closeForm();
      }
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Login</h2>
      <p className={styles.text}>
        Enter your username or phone number to log in to your Tira Shop account
      </p>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label>USERNAME</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter username"
          />
        </div>
        <div className={styles.inputGroup}>
          <label>PASSWORD</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter password"
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.submitBtn}>
          Login
        </button>
        <div className={styles.registerLink}>
          <p>
            Don`t have an account?{" "}
            <span className={styles.link} onClick={goToRegister}>
              Click here
            </span>
          </p>
        </div>
        <button type="button" className={styles.closeBtn} onClick={closeForm}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
