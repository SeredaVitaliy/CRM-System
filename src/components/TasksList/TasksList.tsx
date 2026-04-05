import { Todo } from "@/types/types";
import TaskItem from "../TaskItem/TaskItem";
import styles from "./TasksList.module.css";

interface Props {
  tasks: Todo[];
  onUpdate: () => Promise<void>;
}

export default function TasksList({ tasks, onUpdate }: Props) {
  return (
    <ul className={styles.taskList}>
      {tasks.map((task) => (
        <TaskItem task={task} key={task.id} onUpdate={onUpdate} />
      ))}
    </ul>
  );
}
