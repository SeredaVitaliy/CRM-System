import { clearUser, setToken } from "@/slices/authSlice";
import { store } from "@/store/store";
import axios from "axios";

const api = axios.create({
  baseURL: "https://easydev.club/api/v1",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

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
        const refreshTokenValue = store.getState().auth.refreshToken;

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
        localStorage.setItem("accessToken", accessToken);
        store.dispatch(setToken(refreshToken));

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        store.dispatch(clearUser());

        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
