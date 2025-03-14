import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppProvider, useAppContext } from "./context/AppContext"; // Đảm bảo đường dẫn đúng
import HomePage from "./components/HomePage/HomePage";
import AuthPage from "./components/Auth/AuthPage";
import CheckoutPage from "./components/Checkout/CheckoutPage";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import ForgotPasswordPage from "./components/Auth/ForgotPasswordPage";
import VerifyCodePage from "./components/Auth/VerifyCodePage";
import SetNewPasswordPage from "./components/Auth/SetNewPasswordPage";
import UserProfile from "./components/UserProfile/UserProfile";
import FixedHeader from "./components/Header/FixedHeader";
import Cart from "./components/Cart/Cart";
import "./assets/style/toastifyCustom.module.scss";

// Protected Route Component để bảo vệ các route cần đăng nhập
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAppContext();
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app-container">
          <FixedHeader />
          <Cart />
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/verify-code" element={<VerifyCodePage />} />
              <Route
                path="/set-new-password"
                element={<SetNewPasswordPage />}
              />

              {/* Protected Routes */}
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/product/:id"
                element={
                  <ProtectedRoute>
                    <ProductDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />

              {/* 404 Route */}
            </Routes>
          </main>
        </div>
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
          toastStyle={{ fontSize: "1rem", fontFamily: "Poppins, sans-serif" }} // Tùy chỉnh style toast
        />
      </Router>
    </AppProvider>
  );
}

export default App;
