import TaskItem from "../TaskItem/TaskItem";
import styles from "./TasksList.module.css";

export default function TasksList({ tasks, onUpdate }) {
  return (
    <ul className={styles.taskList}>
      {tasks.map((task) => (
        <TaskItem task={task} key={task.id} onUpdate={onUpdate} />
      ))}
    </ul>
  );
}
