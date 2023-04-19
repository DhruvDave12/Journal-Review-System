import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://journal-review-system.onrender.com",
  withCredentials: true,
});

export default axiosInstance;
