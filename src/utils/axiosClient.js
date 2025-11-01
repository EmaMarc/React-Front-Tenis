import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:80", // puerto del back
  headers: { "Content-Type": "application/json" }
});

// chupo el token
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // guardado al loguear
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// interceptors maneja errores globales
axiosClient.interceptors.response.use(
  (res) => res,
  (err) => {
    // si vence el token deslogueao
    if (err?.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    return Promise.reject(err);
  }
);

export default axiosClient;
