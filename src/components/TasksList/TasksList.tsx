import TaskItem from "../TaskItem/TaskItem";
import styles from "./TasksList.module.css";

type Task = {
  id: number;
  title: string;
  isDone: boolean;
};

type TasksListProps = {
  tasks: Task[];
  onUpdate: () => Promise<void>;
};

export default function TasksList({ tasks, onUpdate }: TasksListProps) {
  return (
    <ul className={styles.taskList}>
      {tasks.map((task) => (
        <TaskItem task={task} key={task.id} onUpdate={onUpdate} />
      ))}
    </ul>
  );
}
