import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://mini-url-generator.onrender.com",
  withCredentials: true,
});

export default axiosInstance;
