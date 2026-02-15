import TaskItem from "./TaskItem";

export default function TasksList({
  tasks,
  editingTask,
  onDeleteTask,
  onToggle,
}) {
  return (
    <ul style={{ display: "grid" }}>
      {tasks.map((task) => (
        <TaskItem
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
