import { useEffect, useState } from "react";
import Item from "./components/Item";
import {
  addTask,
  deleteTask,
  fetchEditTitleTask,
  fetchingTasks,
  // fetchingTasks,
  fetchingTasksFilter,
} from "./FetchingTasks";
import Form from "./components/Form";
import TabButton from "./components/TabButton";

export function App() {
  const [tabContent, setTabContent] = useState("all");
  //tasks
  const [tasks, setTasks] = useState([]); // передаются в форму и используется для вывода в айтемЛист

  const [counter, setCounter] = useState("");

  async function handleAddTask(task) {
    // const responseTask =
    await addTask(task);
    await fetchTabs(tabContent);

    // const allTasks = await fetchingTasks();

    // setTasks(allTasks);
    // console.log(allTasks);
  }

  //Редактирование задачи
  async function handleEditTaskTitle(newTaskTitle, id) {
    // const response =
    await fetchEditTitleTask({ title: newTaskTitle }, id);
    // setTasks(tabContent);
    // const response = await fetchingTasksFilter(tabContent);
    // setTasks(response);
    await fetchTabs(tabContent);

    // setTabContent();
    // const allTasks = await fetchingTasks();
    // setTasks(allTasks);
    // console.log(allTasks);
  }

  //удаление задачи
  async function handleDeletedTask(id) {
    // const response =
    await deleteTask(id);

    await fetchTabs(tabContent);

    // const allTasks = await fetchingTasks();
    // setTabContent(tabContent);
    // setTasks(tabContent);
    // setTasks(allTasks);
    // console.log(allTasks);
  }

  //сравнение для чекбокса - для фильтрации
  async function handleToggleTask(isDone, id) {
    await fetchEditTitleTask({ isDone: !isDone }, id);

    // const allTasks = await fetchingTasks();
    // const tabedTasks = await fetchingTasksFilter();
    // setTasks();
    await fetchTabs(tabContent);

    console.log(tabContent);
    // console.log(responseId);
  }

  // отправка запроса на сервер, чтобы получить список задач с сервера
  useEffect(
    function () {
      async function fetchTasks() {
        await fetchTabs(tabContent);

        // setTasks(data);
        // fetchTabs(tabContent);

        // console.log(data);
      }
      fetchTasks();
    },
    [tabContent],
  );

  //Табы
  async function handleSelectTab(selectedButton) {
    setTabContent(selectedButton);
    // const allTasks = await fetchingTasks();
    // setTasks(allTasks);
    // await fetchTabs(selectedButton);
    console.log(selectedButton);
  }

  //функция для обновления состояния при табах
  async function fetchTabs(tabContent) {
    if (tabContent === "all") {
      const response = await fetchingTasks();
      setTasks(response.data);
      setCounter(response.info);
      console.log(counter);
    }
    if (tabContent !== "all") {
      const response = await fetchingTasksFilter(tabContent);
      setTasks(response.data);
      setCounter(response.info);
      console.log(response);
      console.log(counter);
    }
  }

  /* 
  const compeledTasks = tasks.filter((task) => task.isDone);

  console.log(compeledTasks);

  const inWorkTasks = tasks.filter((task) => !task.isDone);

  console.log(inWorkTasks);

  console.log(tabContent);

  const visibleTasks =
    (tabContent === "completed" && compeledTasks) ||
    (tabContent === "inWork" && inWorkTasks) ||
    (tabContent === "all" && tasks);
*/
  return (
    <div className="todo-container">
      <Form onUpdate={handleAddTask} />
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
      <ItemList
        tasks={tasks}
        editingTask={handleEditTaskTitle}
        onDeleteTask={handleDeletedTask}
        onToggle={handleToggleTask}
      />
    </div>
  );
}

export default function ItemList({
  tasks,
  editingTask,
  onDeleteTask,
  onToggle,
}) {
  return (
    <ul style={{ display: "grid" }}>
      {tasks.map((task) => (
        <Item
          task={task}
          key={task.id}
          editingTask={editingTask}
          onDeleteTask={onDeleteTask}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
}
