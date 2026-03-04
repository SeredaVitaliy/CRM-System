import TaskItem from "../TaskItem/TaskItem";
import styles from "./TasksList.module.css";

export default function TasksList({
  tasks,
  onUpdate,
  editingTask,
  // onDeleteTask,
  onToggle,
}) {
  return (
    <ul className={styles.taskList}>
      {tasks.map((task) => (
        <TaskItem
          task={task}
          key={task.id}
          onUpdate={onUpdate}
          editingTask={editingTask}
          // onDeleteTask={onDeleteTask}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
}
