import {
  MetaResponse,
  User,
  UserFilters,
  UserRequest,
  UserRolesRequest,
} from "@/types/admin";
import api from "./axiosInstance";

export async function getUser(id: number): Promise<User> {
  try {
    const response = await api.get(`/admin/users/${id}`);

    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function updateUserRights(
  id: number,
  data: UserRolesRequest,
): Promise<User> {
  try {
    const response = await api.post(`/admin/users/${id}/rights`, data);

    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function updateUser(id: number, data: UserRequest): Promise<User> {
  try {
    const response = await api.put(`/admin/users/${id}`, data);

    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function blockUser(id: number): Promise<User> {
  try {
    const response = await api.post(`/admin/users/${id}/block`);

    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function unblockUser(id: number): Promise<User> {
  try {
    const response = await api.post(`/admin/users/${id}/unblock`);

    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function deleteUser(id: number): Promise<void> {
  try {
    await api.delete(`/admin/users/${id}`);
  } catch (error) {
    throw error;
  }
}

export async function getUsers(
  userFilters: UserFilters,
): Promise<MetaResponse<User>> {
  try {
    const response = await api.get("/admin/users", { params: userFilters });
    return response.data;
  } catch (error) {
    throw error;
  }
}
