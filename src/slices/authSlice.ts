import { Profile, Token } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: Profile | null;
  token: Token | null;
  isAuthenticated: boolean;
  refreshToken: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  refreshToken: null,
};
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
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const { setUser, clearUser, setToken } = authSlice.actions;

export default authSlice.reducer;
