import axios from "axios";

const API_URL = "http://localhost:8080/tirashop/auth";

/**
 * Đăng nhập và lưu token vào localStorage
 */
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });

    if (response.data.status === "success" && response.data.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data.data)); // Lưu thông tin user
      return response.data.data; // Trả về dữ liệu user
    }

    throw new Error("Đăng nhập thất bại!");
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Sai tài khoản hoặc mật khẩu!"
    );
  }
};

/**
 * Đăng xuất và xóa token khỏi localStorage
 */
export const logout = async () => {
  try {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData || !userData.token) {
      console.warn("No token found, skipping logout request.");
      localStorage.removeItem("user");
      return;
    }

    await axios.post(
      `${API_URL}/logout`,
      {},
      {
        headers: { Authorization: `Bearer ${userData.token}` },
      }
    );

    localStorage.removeItem("user");
  } catch (error) {
    console.error("Logout failed:", error.response?.data || error.message);
  }
};

/**
 * Lấy thông tin người dùng từ localStorage
 */
export const getCurrentUser = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  return userData && userData.token ? userData : null;
};

/**
 * Đăng ký user mới
 */
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register-new-user`, userData);
    return response.data;
  } catch (error) {
    console.error("Register failed:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Đăng ký thất bại!");
  }
};
