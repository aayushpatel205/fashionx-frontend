import axios from "axios";

const PORT = 8002;

const axiosInstance = axios.create({
  baseURL: `http://localhost:${PORT}`, // Replace with your backend URL
  withCredentials: true, // Ensures cookies are sent with requests
});

export default axiosInstance;
