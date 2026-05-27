import { Profile, Token } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  user: Profile | null;
  token: Token | null;
  isAuthenticated: boolean;
  refreshToken: string | null;
  isInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  refreshToken: null,
  isInitialized: false,
};

export const initialAuth = createAsyncThunk(
  "auth/initial",
  async (_, { dispatch }) => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) return;

    try {
      const response = await axios.post(
        "https://easydev.club/api/v1/auth/refresh",
        { refreshToken },
      );

      const { accessToken, refreshToken: newRefreshToken } = response.data;
      localStorage.setItem("refreshToken", newRefreshToken);
      dispatch(setToken({ accessToken, refreshToken: newRefreshToken }));
    } catch {
      localStorage.removeItem("refreshToken");
    }
  },
);
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthState>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },
    clearUser(state) {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
    setToken(state, action: PayloadAction<Token>) {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initialAuth.fulfilled, (state) => {
        state.isInitialized = true;
      })
      .addCase(initialAuth.rejected, (state) => {
        state.isInitialized = true;
      });
  },
});

export const { setUser, clearUser, setToken } = authSlice.actions;

export default authSlice.reducer;
