import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://bgvsystem-api.onrender.com/api";

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {

    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;

  }
);

export default apiClient;