import {
  AuthData,
  Profile,
  RefreshToken,
  Token,
  UserRegistration,
} from "@/types/types";
import api from "./axiosInstance";

export async function registerUser(
  newUser: UserRegistration,
): Promise<Profile> {
  try {
    const response = await api.post("/auth/signup", newUser);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function authUser(user: AuthData): Promise<Token> {
  try {
    const response = await api.post("/auth/signin", user);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function refreshToken(token: RefreshToken): Promise<Token> {
  try {
    const response = await api.post("/auth/refresh", token);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getUserProfile(): Promise<Profile> {
  try {
    const response = await api.get("/user/profile");

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function logoutUser() {
  try {
    await api.post("/user/logout");
  } catch (error) {
    throw error;
  }
}
