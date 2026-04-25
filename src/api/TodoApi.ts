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
    const url = new URL("https://easydev.club/api/v1/todos");
    if (actualFilter) {
      url.searchParams.set("filter", actualFilter);
    }
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("не удалось получить данные");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function addTask(task: TodoRequest): Promise<Todo> {
  try {
    const response = await fetch("https://easydev.club/api/v1/todos", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("не удалось обновить данные(добавление задачи)");
    }
    const resData = await response.json();

    return resData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//удаление
export async function deleteTask(id: number): Promise<void> {
  try {
    const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("не удалось обновить данные(удаление задачи)");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//редактирование тайтла задачи
export async function fetchEditTask(
  editTask: TodoRequest,
  id: number,
): Promise<Todo> {
  try {
    const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(editTask),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("не удалось обновить данные");
    }
    const resData = await response.json();
    return resData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
