import { Profile, Token } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface AsyncState {
//   isLoading: boolean;
//   isSuccess: boolean;
//   isError: boolean;
// }

interface AuthState {
  user: Profile | null;
  token: Token | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null, //user
  token: null, //token
  isAuthenticated: Boolean(localStorage.getItem("accessToken")),
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthState>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    clearUser(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
