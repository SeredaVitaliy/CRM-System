export async function fetchingTasks() {
  const res = await fetch("https://easydev.club/api/v1/todos");
  const data = await res.json();

  return data.data;
}

export async function fetchingTasksFilter(filter) {
  const res = await fetch(`https://easydev.club/api/v1/todos?filter=${filter}`);
  const data = await res.json();

  return data.data;
}

export async function addTask(task) {
  const response = await fetch("https://easydev.club/api/v1/todos", {
    method: "POST",
    body: JSON.stringify(task),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error("не удалось обновить данные пользователя");
  }
  console.log(resData);
  return resData;
}

//получение айди задачи
export async function getTaskId(id) {
  const response = await fetch(`https://easydev.club/api/v1/todos/${id}`);
  const data = await response.json();

  return data.id;
}

//удаление
export async function deleteTask(id) {
  await fetch(`https://easydev.club/api/v1/todos/${id}`, {
    method: "DELETE",
  });
}

//редактирование тайтла задачи
export async function fetchEditTitleTask(newTaskTitle, id) {
  const res = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(newTaskTitle),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resData = await res.json();

  return resData;
}
