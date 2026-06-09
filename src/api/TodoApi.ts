import {
  MetaResponse,
  Todo,
  TodoFilter,
  TodoInfo,
  TodoRequest,
} from "@/types/todo";
import api from "./axiosInstance";

export async function getTodos(
  filter: TodoFilter,
): Promise<MetaResponse<Todo, TodoInfo>> {
  try {
    const response = await api.get("/todos", {
      params: { filter },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function addTodo(todo: TodoRequest): Promise<Todo> {
  try {
    const response = await api.post("/todos", todo);

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteTodo(id: number): Promise<void> {
  try {
    await api.delete(`/todos/${id}`);
  } catch (error) {
    throw error;
  }
}

export async function editTodo(
  editTodo: TodoRequest,
  id: number,
): Promise<Todo> {
  try {
    const response = await api.put(`/todos/${id}`, editTodo);

    return response.data;
  } catch (error) {
    throw error;
  }
}
