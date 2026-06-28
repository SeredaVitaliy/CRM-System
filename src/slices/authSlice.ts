import { getUserProfile } from "@/api/AuthApi";
import { tokenManager } from "@/api/tokenStorage";
import { Profile } from "@/types/profile";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  user: Profile | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isInitialized: false,
};

export const initialAuth = createAsyncThunk("auth/initial", async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) return null;

  try {
    const response = await axios.post(
      "https://easydev.club/api/v1/auth/refresh",
      { refreshToken },
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data;
    tokenManager.setAccessToken(accessToken);
    localStorage.setItem("refreshToken", newRefreshToken);
    const profile = await getUserProfile();
    return profile;
  } catch {
    localStorage.removeItem("refreshToken");
    return null;
  }
});
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Profile | null>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initialAuth.fulfilled, (state, action) => {
        state.isInitialized = true;
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = true;
        } else {
          state.isAuthenticated = false;
        }
      })
      .addCase(initialAuth.rejected, (state) => {
        state.isInitialized = true;
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
