import { useEffect, useState } from "react";
import { getTasks } from "../../api/TodoApi.ts";

import styles from "./TodosPage.module.css";
import TasksList from "../../components/TasksList/TasksList.tsx";
import AddTask from "../../components/AddTask/AddTask.tsx";
import TabButtons from "../../components/TabButtons/TabButtons.tsx";
import { Todo, TodoFilter, TodoInfo } from "@/types/types.ts";

export function TodosPage() {
  const [selectedTab, setSelectedTab] = useState<TodoFilter>("all");
  const [tasks, setTasks] = useState<Todo[]>([]);

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

  function handleSelectTab(selectedButton: TodoFilter) {
    setSelectedTab(selectedButton);
  }

  async function fetchTabs(selectedTab: TodoFilter) {
    try {
      const response = await getTasks(selectedTab);
      setTasks(response.data);
      setTodoInfo(response.info!);
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
