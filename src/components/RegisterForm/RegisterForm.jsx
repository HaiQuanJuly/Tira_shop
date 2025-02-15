import { useState } from "react";
import styles from "./styles.module.scss";
import { register } from "../../service/authService";

const RegisterForm = ({ closeForm }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Confirmation password does not match!");
      return;
    }

    try {
      await register(formData);
      setSuccessMessage("Register Success");
      setTimeout(closeForm, 2000);
    } catch (err) {
      setError(err.message || "Register failed");
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label>FirstName</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
            placeholder="Enter your last name"
          />
        </div>
        <div className={styles.inputGroup}>
          <label>NameName</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
            placeholder="Enter your name"
          />
        </div>
        <div className={styles.inputGroup}>
          <label>PhonePhone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Enter your phone"
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className={styles.inputGroup}>
          <label>PasswordPassword</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter passwordpassword"
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Comfirm password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Comfirm password"
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>}
        <button type="submit" className={styles.submitBtn}>
          Register
        </button>
        <button type="button" className={styles.closeBtn} onClick={closeForm}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
