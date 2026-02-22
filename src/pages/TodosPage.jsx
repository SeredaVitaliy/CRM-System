import { useEffect, useState } from "react";
import {
  //   addTask,
  deleteTask,
  fetchEditTask,
  //   fetchingTasksFilter,
  getTasks,
} from "../api/fetchingTasks";

import TasksList from "../components/TasksList/TasksList";
import AddTask from "../components/AddTask/AddTask";
import TabButtons from "../components/TabButtons/TabButtons";

export function TodosPage() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [tasks, setTasks] = useState([]); // передаются в форму и используется для вывода в айтемЛист

  const [todoInfo, setTodoInfo] = useState({ all: 0, inWork: 0, completed: 0 });

  async function handleAddTask() {
    try {
      await fetchTabs(selectedTab);

      console.log(tasks);
    } catch (error) {
      alert(error);
    }
  }

  //Редактирование задачи
  async function handleEditTaskTitle(newTaskTitle, id) {
    try {
      await fetchEditTask({ title: newTaskTitle }, id);

      await fetchTabs(selectedTab);
    } catch (error) {
      alert(error);
    }
  }

  //удаление задачи
  async function handleDeletedTask(id) {
    try {
      await deleteTask(id);

      await fetchTabs(selectedTab);
    } catch (error) {
      alert(error);
    }
  }

  //сравнение для чекбокса - для фильтрации
  async function handleToggleTask(isDone, id) {
    try {
      await fetchEditTask({ isDone: !isDone }, id);

      await fetchTabs(selectedTab);

      console.log(selectedTab);
    } catch (error) {
      alert(error);
    }
  }

  // отправка запроса на сервер, чтобы получить список задач с сервера
  useEffect(
    function () {
      async function fetchTasks() {
        try {
          await fetchTabs(selectedTab);
        } catch (error) {
          alert(error);
        }
      }
      fetchTasks();
    },
    [selectedTab],
  );

  //Табы
  function handleSelectTab(selectedButton) {
    setSelectedTab(selectedButton);

    console.log(selectedButton);
  }

  //функция для обновления состояния при табах
  async function fetchTabs(selectedTab) {
    try {
      const response = await getTasks(selectedTab);
      setTasks(response.data);
      setTodoInfo(response.info);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="todo-container">
      <AddTask onUpdate={handleAddTask} />
      <menu
        style={{ display: "flex", justifyContent: "space-between", gap: "5px" }}
      >
        <TabButtons
          selectedTab={selectedTab}
          todoInfo={todoInfo}
          onSelectedTab={handleSelectTab}
        />
      </menu>
      {/* {tabContent} */}
      <TasksList
        tasks={tasks}
        editingTask={handleEditTaskTitle}
        onDeleteTask={handleDeletedTask}
        onToggle={handleToggleTask}
      />
    </div>
  );
}
