import axios from "axios";

import {
  MetaResponse,
  Todo,
  TodoFilter,
  TodoInfo,
  TodoRequest,
} from "@/types/types";

export async function getTasks(
  filter: TodoFilter,
): Promise<MetaResponse<Todo, TodoInfo>> {
  try {
    const actualFilter = filter === "all" ? null : filter;

    const response = await axios.get("https://easydev.club/api/v1/todos", {
      params: actualFilter ? { filter: actualFilter } : null,
    });

    return response.data;
  } catch (error) {
    console.error("не удалось получить данные");
    throw error;
  }
}

export async function addTask(task: TodoRequest): Promise<Todo> {
  try {
    const response = await axios.post(
      "https://easydev.club/api/v1/todos",
      task,
    );

    return response.data;
  } catch (error) {
    console.error("не удалось обновить данные(добавление задачи)");
    throw error;
  }
}

export async function deleteTask(id: number): Promise<void> {
  try {
    await axios.delete(`https://easydev.club/api/v1/todos/${id}`);
  } catch (error) {
    console.error("не удалось обновить данные(удаление задачи)");
    throw error;
  }
}

export async function fetchEditTask(
  editTask: TodoRequest,
  id: number,
): Promise<Todo> {
  try {
    const response = await axios.put(
      `https://easydev.club/api/v1/todos/${id}`,
      editTask,
    );

    return response.data;
  } catch (error) {
    console.error("не удалось обновить данные");
    throw error;
  }
}
