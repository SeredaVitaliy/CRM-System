export async function fetchingTasks() {
  try {
    const response = await fetch("https://easydev.club/api/v1/todos");
    const data = await response.json();

    if (!response.ok) {
      throw new Error("не удалось получить данные");
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchingTasksFilter(filter) {
  try {
    const response = await fetch(
      `https://easydev.club/api/v1/todos?filter=${filter}`,
    );

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

export async function addTask(task) {
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

//получение айди задачи
export async function getTaskId(id) {
  try {
    const response = await fetch(`https://easydev.club/api/v1/todos/${id}`);
    const data = await response.json();

    return data.id;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//удаление
export async function deleteTask(id) {
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
export async function fetchEditTask(editTask, id) {
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
