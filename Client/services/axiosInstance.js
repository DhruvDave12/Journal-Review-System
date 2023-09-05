import axios from "axios";

const BASEURL = process.env.NEXT_PUBLIC_STAGE_MODE === "production" ? "https://journal-review-system.onrender.com" : "http://localhost:1337/";
console.log("BASE URL: ", BASEURL);
const axiosInstance = axios.create({
  baseURL: BASEURL,
  withCredentials: true,
});

export default axiosInstance;
