import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./TaskItem.module.css";
import CheckBox from "../../ui/CheckBox/CheckBox.tsx";
import IconButton from "../../ui/IconButton/IconButton.tsx";
import titleValidation from "../../utils/validator.ts";
import { deleteTask, fetchEditTask } from "../../api/TodoApi.ts";
import { Todo } from "@/types/types.ts";

type TaskItemProps = {
  task: Todo;
  onUpdate: () => Promise<void>;
};

export default function TaskItem({ task, onUpdate }: TaskItemProps) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTaskTitle, setEditTaskTitle] = useState<string>(task.title);
  const [errorValid, setErrorValid] = useState<string>("");

  async function handleEditFormSubmit(e: FormEvent<HTMLFormElement>) {
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
      if (error instanceof Error) alert(error.message);
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

  function handleEditTitleChange(e: ChangeEvent<HTMLInputElement>) {
    setEditTaskTitle(e.target.value);
  }

  async function handleDeleteTask(id: number) {
    try {
      await deleteTask(id);
      await onUpdate();
    } catch (error) {
      alert(error);
    }
  }

  async function handleToggleTask(isDone: boolean, id: number) {
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
              <IconButton type="submit" ariaLabel="save" variant="primary">
                <img src="/src/assets/ok.svg" />
              </IconButton>
              <IconButton
                type="button"
                ariaLabel="return"
                variant="danger"
                onClick={handleReturnClick}
              >
                <img src="/src/assets/return.svg" />
              </IconButton>
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
                variant="primary"
                onClick={handleToggleEdit}
              >
                <img src="/src/assets/Group.svg" />
              </IconButton>

              <IconButton
                ariaLabel="delete"
                variant="danger"
                onClick={() => handleDeleteTask(task.id)}
              >
                <img src="/src/assets/Vector.svg" />
              </IconButton>
            </div>
          </>
        )}
      </div>
    </li>
  );
}
