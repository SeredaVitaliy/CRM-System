import { Todo } from "../../types/todo";
import TodoItem from "../TodoItem/TodoItem";
import styles from "./TodoList.module.css";

interface Props {
  todos: Todo[];
  onUpdate: () => Promise<void>;
}

export default function TodoList({ todos, onUpdate }: Props) {
  return (
    <ul className={styles.todoList}>
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} onUpdate={onUpdate} />
      ))}
    </ul>
  );
}
