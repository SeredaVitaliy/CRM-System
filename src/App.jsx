import { useEffect, useState } from "react";
import {
  addTask,
  deleteTask,
  fetchEditTask,
  fetchingTasks,
  fetchingTasksFilter,
} from "./api/FetchingTasks";
import TabButton from "./components/TabButton";
import TasksList from "./components/TasksList";
import InputTask from "./components/InputTask";

export function App() {
  const [tabContent, setTabContent] = useState("all");
  const [tasks, setTasks] = useState([]); // передаются в форму и используется для вывода в айтемЛист

  const [counter, setCounter] = useState("");

  async function handleAddTask(task) {
    try {
      await addTask(task);
      await fetchTabs(tabContent);

      console.log(tasks);
    } catch (error) {
      console.error(error);
    }
  }

  //Редактирование задачи
  async function handleEditTaskTitle(newTaskTitle, id) {
    try {
      await fetchEditTask({ title: newTaskTitle }, id);

      await fetchTabs(tabContent);
    } catch (error) {
      console.error(error);
    }
  }

  //удаление задачи
  async function handleDeletedTask(id) {
    try {
      await deleteTask(id);

      await fetchTabs(tabContent);
    } catch (error) {
      console.error(error);
    }
  }

  //сравнение для чекбокса - для фильтрации
  async function handleToggleTask(isDone, id) {
    try {
      await fetchEditTask({ isDone: !isDone }, id);

      await fetchTabs(tabContent);

      console.log(tabContent);
    } catch (error) {
      console.error(error);
    }
  }

  // отправка запроса на сервер, чтобы получить список задач с сервера
  useEffect(
    function () {
      async function fetchTasks() {
        try {
          await fetchTabs(tabContent);
        } catch (error) {
          console.error(error);
        }
      }
      fetchTasks();
    },
    [tabContent],
  );

  //Табы
  async function handleSelectTab(selectedButton) {
    setTabContent(selectedButton);

    console.log(selectedButton);
  }

  //функция для обновления состояния при табах
  async function fetchTabs(tabContent) {
    try {
      if (tabContent === "all") {
        const response = await fetchingTasks();
        setTasks(response.data);
        setCounter(response.info);
        console.log(counter);
      } else {
        const response = await fetchingTasksFilter(tabContent);

        setTasks(response.data);
        setCounter(response.info);
        console.log(response);
        console.log(counter);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="todo-container">
      <InputTask onUpdate={handleAddTask} />
      <menu
        style={{ display: "flex", justifyContent: "space-between", gap: "5px" }}
      >
        <TabButton
          isSelected={tabContent === "all"}
          onSelect={() => handleSelectTab("all")}
        >
          Все ({counter.all})
        </TabButton>
        <TabButton
          isSelected={tabContent === "inWork"}
          onSelect={() => handleSelectTab("inWork")}
        >
          в работе ({counter.inWork})
        </TabButton>
        <TabButton
          isSelected={tabContent === "completed"}
          onSelect={() => handleSelectTab("completed")}
        >
          сделано ({counter.completed})
        </TabButton>
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
