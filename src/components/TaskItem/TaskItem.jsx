import { useState } from "react";
import styles from "./TaskItem.module.css";
import CheckBox from "../../ui/CheckBox/CheckBox";
import IconButton from "../../ui/IconButton/IconButton";
import titleValidation from "../../utils/validator";
import { deleteTask, fetchEditTask } from "../../api/fetchingTasks";

export default function TaskItem({ task, onUpdate }) {
  const [isEdit, setIsEdit] = useState(false); // стейт для редактирования
  const [editTaskTitle, setEditTaskTitle] = useState(task.title);
  const [errorValid, setErrorValid] = useState("");

  async function handleEditFormSubmit(e) {
    e.preventDefault();

    const errorMessage = titleValidation(editTaskTitle.trim());

    if (errorMessage) {
      setErrorValid(errorMessage);
      return;
    }
    try {
      await fetchEditTask({ title: editTaskTitle.trim() }, task.id);

      await onUpdate();
      setIsEdit(false);
      setErrorValid("");
    } catch (error) {
      alert(error.message);
    }
  }

  function handleToggleEdit() {
    setIsEdit((editing) => !editing);
    setErrorValid("");
  }

  function handleReturnClick() {
    setEditTaskTitle(task.title);
    setIsEdit(false);
    setErrorValid("");
  }

  function handleEditTitleChange(e) {
    setEditTaskTitle(e.target.value);
  }

  async function handleDeleteTask(id) {
    try {
      await deleteTask(id);
      await onUpdate();
    } catch (error) {
      alert(error);
    }
  }

  async function handleToggleTask(isDone, id) {
    try {
      await fetchEditTask({ isDone: !isDone }, id);

      await onUpdate();
    } catch (error) {
      alert(error);
    }
  }

  return (
    <li className={styles.tasksItem}>
      <div className={styles.taskMain}>
        <CheckBox
          type="checkbox"
          checked={task.isDone}
          onChange={() => handleToggleTask(task.isDone, task.id)}
        />

        {isEdit && (
          <form onSubmit={handleEditFormSubmit} className={styles.editInput}>
            <div className={styles.editTitle}>
              <input
                className={styles.formEdit}
                value={editTaskTitle}
                onChange={handleEditTitleChange}
              />
              {errorValid && <p className={styles.errorText}>{errorValid}</p>}
            </div>

            <div className={styles.editButtons}>
              <IconButton
                type="submit"
                ariaLabel="save"
                variant="save"
              ></IconButton>
              <IconButton
                type="button"
                ariaLabel="return"
                variant="return"
                onClick={handleReturnClick}
              ></IconButton>
            </div>
          </form>
        )}

        {!isEdit && (
          <>
            <span
              className={task.isDone ? styles.taskIsDone : styles.taskTitle}
            >
              {task.title}
            </span>

            <div className={styles.initialButtons}>
              <IconButton
                ariaLabel="edit"
                variant="edit"
                onClick={handleToggleEdit}
              ></IconButton>

              <IconButton
                ariaLabel="delete"
                variant="delete"
                onClick={() => handleDeleteTask(task.id)}
              ></IconButton>
            </div>
          </>
        )}
      </div>
    </li>
  );
}
