import axios from "axios";
import { API_URL } from "../../Api/Api";

// Create Axios instance
export const Axios = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add interceptor to dynamically attach token for each request
Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("admin-auth");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
