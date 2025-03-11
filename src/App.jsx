import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./components/HomePage/HomePage";
import AuthPage from "./components/Auth/AuthPage";
import CheckoutPage from "./components/Checkout/CheckoutPage";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import "./assets/style/toastifyCustom.module.scss";
import ForgotPasswordPage from "./components/Auth/ForgotPasswordPage";
import VerifyCodePage from "./components/Auth/VerifyCodePage";
import SetNewPasswordPage from "./components/Auth/SetNewPasswordPage";
function App() {
  return (
    <Router>
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
      </Routes>
    </Router>
  );
}

export default App;
