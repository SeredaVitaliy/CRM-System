import { useCallback, useEffect, useState } from "react";
import { getTodos } from "../../api/TodoApi.ts";

import styles from "./TodosPage.module.css";
import TabButtons from "../../components/TabButtons/TabButtons.tsx";
import { Todo, TodoFilter, TodoInfo } from "@/types/todo";
import AddTodo from "../../components/AddTodo/AddTodo.tsx";
import TodoList from "../../components/TodoList/TodoList.tsx";
import { notification } from "antd";

export function TodosPage() {
  const [selectedTab, setSelectedTab] = useState<TodoFilter>("all");
  const [todos, setTodos] = useState<Todo[]>([]);

  const [todoInfo, setTodoInfo] = useState<TodoInfo>({
    all: 0,
    inWork: 0,
    completed: 0,
  });

  const updateTodos = useCallback(async () => {
    try {
      await fetchTabs(selectedTab);
    } catch (error) {
      notification.error({
        message: "не удалось обновить данные",
      });
    }
  }, [selectedTab]);

  useEffect(
    function () {
      async function fetchTodos() {
        try {
          await fetchTabs(selectedTab);
        } catch (error) {
          notification.error({
            message: "не удалось обновить данные",
          });
        }
      }
      fetchTodos();

      const interval = setInterval(fetchTodos, 5000);

      return () => clearInterval(interval);
    },
    [selectedTab],
  );

  function handleSelectTab(selectedButton: TodoFilter) {
    setSelectedTab(selectedButton);
  }

  async function fetchTabs(selectedTab: TodoFilter) {
    try {
      const response = await getTodos(selectedTab);
      setTodos(response.data);
      setTodoInfo(response.info!);
    } catch (error) {
      throw error;
    }
  }

  return (
    <div className={styles.container}>
      <AddTodo onUpdate={updateTodos} />
      <TabButtons todoInfo={todoInfo} onSelectedTab={handleSelectTab} />
      <TodoList onUpdate={updateTodos} todos={todos} />
    </div>
  );
}
