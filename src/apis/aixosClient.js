import axios from "axios";
const axiosClient = axios.create({
  baseURL: "http://localhost:8080/tirashop/v3/api-docs",
  timeout: 10000,
  headers: { "Contect-Type": "application/json" },
});
export default axiosClient;
