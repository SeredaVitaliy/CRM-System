import { clearUser } from "@/slices/authSlice";
import { store } from "@/store/store";
import axios from "axios";
import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from "./tokenStorage";

const api = axios.create({
  baseURL: "https://easydev.club/api/v1",
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshTokenValue = localStorage.getItem("refreshToken");

        if (!refreshTokenValue) {
          return Promise.reject(error);
        }

        const response = await axios.post(
          "https://easydev.club/api/v1/auth/refresh",
          {
            refreshToken: refreshTokenValue,
          },
        );

        const { accessToken } = response.data;
        const { refreshToken } = response.data;
        setAccessToken(accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        clearAccessToken();
        store.dispatch(clearUser());
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
