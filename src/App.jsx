import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppProvider } from "./context/AppContext"; // Import AppProvider từ Context
import HomePage from "./components/HomePage/HomePage";
import AuthPage from "./components/Auth/AuthPage";
import CheckoutPage from "./components/Checkout/CheckoutPage";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import ForgotPasswordPage from "./components/Auth/ForgotPasswordPage";
import VerifyCodePage from "./components/Auth/VerifyCodePage";
import SetNewPasswordPage from "./components/Auth/SetNewPasswordPage";
import UserProfile from "./components/UserProfile/UserProfile";
import FixedHeader from "./components/Header/FixedHeader";
import Cart from "./components/Cart/Cart"; // Import Cart component
import "./assets/style/toastifyCustom.module.scss";

function App() {
  return (
    <AppProvider>
      {" "}
      {/* Bọc toàn bộ ứng dụng trong AppProvider */}
      <Router>
        <FixedHeader /> {/* Đặt FixedHeader ở cấp cao nhất */}
        <Cart /> {/* Thêm Cart để hiển thị sidebar */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verify-code" element={<VerifyCodePage />} />
          <Route path="/set-new-password" element={<SetNewPasswordPage />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
