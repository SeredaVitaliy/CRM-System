import { useEffect, useState } from "react";
import { getTasks } from "../../api/TodoApi.ts";

import styles from "./TodosPage.module.css";
import TasksList from "../../components/TasksList/TasksList.tsx";
import AddTask from "../../components/AddTask/AddTask.tsx";
import TabButtons from "../../components/TabButtons/TabButtons.tsx";

type Tab = "all" | "inWork" | "completed";

type TodoInfo = {
  all: number;
  inWork: number;
  completed: number;
};

type Task = {
  id: number;
  title: string;
  isDone: boolean;
};

export function TodosPage() {
  const [selectedTab, setSelectedTab] = useState<Tab>("all");
  const [tasks, setTasks] = useState<Task[]>([]);

  const [todoInfo, setTodoInfo] = useState<TodoInfo>({
    all: 0,
    inWork: 0,
    completed: 0,
  });

  async function updateTasks() {
    try {
      await fetchTabs(selectedTab);
    } catch (error) {
      alert(error);
    }
  }

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

  function handleSelectTab(selectedButton: Tab) {
    setSelectedTab(selectedButton);
  }

  async function fetchTabs(selectedTab: Tab) {
    try {
      const response = await getTasks(selectedTab);
      setTasks(response.data);
      setTodoInfo(response.info);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className={styles.container}>
      <AddTask onUpdate={updateTasks} />
      <TabButtons
        selectedTab={selectedTab}
        todoInfo={todoInfo}
        onSelectedTab={handleSelectTab}
      />
      <TasksList onUpdate={updateTasks} tasks={tasks} />
    </div>
  );
}
