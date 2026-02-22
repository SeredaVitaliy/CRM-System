import { useState } from "react";
import styles from "./TaskItem.module.css";
import CheckBox from "../../ui/CheckBox/CheckBox";
import IconButton from "../../ui/IconButton/IconButton";

export default function TaskItem({
  task,
  editingTask,
  onDeleteTask,
  onToggle,
}) {
  const [isEdit, setIsEdit] = useState(false); // стейт для редактирования
  const [editTaskTitle, setEditTaskTitle] = useState(task.title);

  function handleSubmitClick(e) {
    e.preventDefault();
    editingTask(editTaskTitle, task.id);
    setIsEdit(false);
  }

  function handleEditClick() {
    setIsEdit((editing) => !editing);
  }

  function handleReturnClick() {
    setEditTaskTitle(task.title);
    setIsEdit(false);
  }

  function handleChange(e) {
    setEditTaskTitle(e.target.value);
  }

  return (
    <li className="tasks">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
        }}
      >
        <CheckBox
          type="checkbox"
          checked={task.isDone}
          onChange={() => onToggle(task.isDone, task.id)}
        />

        <span style={task.isDone ? { textDecoration: "line-through" } : {}}>
          {isEdit ? (
            <form
              onSubmit={handleSubmitClick}
              style={{ display: "grid", gap: "5px" }}
            >
              <input
                className="form form-edit"
                value={editTaskTitle}
                onChange={handleChange}
              />
              <IconButton
                ariaLabel="save"
                className={styles.btnSave}
              ></IconButton>
              <IconButton
                type="button"
                ariaLabel="return"
                className={styles.btnRes}
                onClick={handleReturnClick}
              ></IconButton>
            </form>
          ) : (
            task.title
          )}
        </span>
      </div>
      <div style={{ display: "flex" }}>
        {!isEdit && (
          <IconButton
            ariaLabel="edit"
            className={styles.btnEdit}
            onClick={handleEditClick}
          ></IconButton>
        )}

        {!isEdit && (
          <IconButton
            ariaLabel="delete"
            className={styles.btnDel}
            onClick={() => onDeleteTask(task.id)}
          ></IconButton>
        )}
      </div>
    </li>
  );
}
