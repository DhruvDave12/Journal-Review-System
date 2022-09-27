import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:1337",
    withCredentials: true,
});

export default axiosInstance;