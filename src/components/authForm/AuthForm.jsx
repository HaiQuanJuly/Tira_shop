import { useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm"; // Đảm bảo bạn đã import RegisterForm đúng

const AuthForm = () => {
  const [showLogin, setShowLogin] = useState(true); // Trạng thái để điều khiển form nào hiển thị

  const handleCloseForm = () => {
    setShowLogin(false); // Đóng form khi nhấn đóng
  };

  const handleGoToRegister = () => {
    setShowLogin(false); // Chuyển sang form đăng ký khi nhấn vào link
  };

  return (
    <div>
      {showLogin ? (
        <LoginForm
          closeForm={handleCloseForm}
          goToRegister={handleGoToRegister} // Truyền hàm goToRegister cho LoginForm
        />
      ) : (
        <RegisterForm closeForm={handleCloseForm} />
      )}
    </div>
  );
};

export default AuthForm;
