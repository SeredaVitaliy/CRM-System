import { useEffect, useState } from "react";
import { getTasks } from "../../api/fetchingTasks";

import styles from "./TodosPage.module.css";
import TasksList from "../../components/TasksList/TasksList";
import AddTask from "../../components/AddTask/AddTask";
import TabButtons from "../../components/TabButtons/TabButtons";

export function TodosPage() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [tasks, setTasks] = useState([]);

  const [todoInfo, setTodoInfo] = useState({ all: 0, inWork: 0, completed: 0 });

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

  function handleSelectTab(selectedButton) {
    setSelectedTab(selectedButton);
  }

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
