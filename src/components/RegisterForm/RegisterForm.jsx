import { useState } from "react";
import styles from "./styles.module.scss";
import { register } from "../../service/authService";

const RegisterForm = ({ closeForm }) => {
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    phone: "",
    gender: "Male",
    email: "",
    birthday: "",
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
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      await register(formData);
      setSuccessMessage("Đăng ký thành công! Vui lòng đăng nhập.");
      setTimeout(closeForm, 2000);
    } catch (err) {
      setError(err.message || "Đăng ký thất bại!");
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h2 className={styles.title}>Register</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) =>
          key !== "confirmPassword" ? (
            <div key={key} className={styles.inputGroup}>
              <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
              />
            </div>
          ) : null
        )}
        <button type="submit" className={styles.submitBtn}>
          Register
        </button>
        <button type="button" className={styles.closeBtn} onClick={closeForm}>
          Close
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
