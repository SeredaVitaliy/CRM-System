import { useState } from "react";
import styles from "./TaskItem.module.css";
import CheckBox from "../../ui/CheckBox/CheckBox";
import IconButton from "../../ui/IconButton/IconButton";
import titleValidation from "../../utils/validator";

export default function TaskItem({
  task,
  editingTask,
  onDeleteTask,
  onToggle,
}) {
  const [isEdit, setIsEdit] = useState(false); // стейт для редактирования
  const [editTaskTitle, setEditTaskTitle] = useState(task.title);
  const [errorValid, setErrorValid] = useState("");

  function handleSubmitClick(e) {
    e.preventDefault();

    const validation = titleValidation(editTaskTitle.trim());

    if (validation) {
      setErrorValid(validation);
      return;
    }

    editingTask(editTaskTitle.trim(), task.id);
    setIsEdit(false);
    setErrorValid("");
  }

  function handleEditClick() {
    setIsEdit((editing) => !editing);
  }

  function handleReturnClick() {
    setEditTaskTitle(task.title);
    setIsEdit(false);
    setErrorValid("");
  }

  function handleChange(e) {
    setEditTaskTitle(e.target.value);
  }

  return (
    <li className={styles.tasksItem}>
      <div className={styles.taskMain}>
        <CheckBox
          type="checkbox"
          checked={task.isDone}
          onChange={() => onToggle(task.isDone, task.id)}
        />

        <>
          {isEdit ? (
            <form onSubmit={handleSubmitClick} className={styles.editInput}>
              <div className={styles.editTitle}>
                <input
                  className={styles.formEdit}
                  value={editTaskTitle}
                  onChange={handleChange}
                />
                <p className={styles.errorText}>{errorValid}</p>
              </div>

              <div className={styles.editButtons}>
                <IconButton
                  type="submit"
                  ariaLabel="save"
                  className={styles.btnSave}
                ></IconButton>
                <IconButton
                  type="button"
                  ariaLabel="return"
                  className={styles.btnRes}
                  onClick={handleReturnClick}
                ></IconButton>
              </div>
            </form>
          ) : (
            <span
              className={task.isDone ? styles.taskIsDone : styles.taskTitle}
            >
              {task.title}
            </span>
          )}
        </>
      </div>

      <div className={styles.initialButtons}>
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
