type Filter = "all" | "inWork" | "completed";

type NewTask = {
  title: string;
  isDone: boolean;
};

type EditTask = {
  title?: string;
  isDone?: boolean;
};

export async function getTasks(filter: Filter) {
  try {
    const actualFilter = filter === "all" ? null : filter;
    const query = actualFilter ? "?filter=" + actualFilter : "";
    const fullUrl = "https://easydev.club/api/v1/todos" + query;
    const response = await fetch(fullUrl);

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

export async function addTask(task: NewTask) {
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

    console.log(resData);
    return resData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//удаление
export async function deleteTask(id: number) {
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
export async function fetchEditTask(editTask: EditTask, id: number) {
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
