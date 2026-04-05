import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./TaskItem.module.css";
import CheckBox from "../../ui/CheckBox/CheckBox.tsx";
import IconButton from "../../ui/IconButton/IconButton.tsx";
import titleValidation from "../../utils/validator.ts";
import { deleteTask, fetchEditTask } from "../../api/TodoApi.ts";
import { Todo, TodoRequest } from "@/types/types.ts";

interface Props {
  task: Todo;
  onUpdate: () => Promise<void>;
}

export default function TaskItem({ task, onUpdate }: Props) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTaskTitle, setEditTaskTitle] = useState<string>(task.title);
  const [errorValid, setErrorValid] = useState<string>("");

  async function updateTodo(
    taskChanges: TodoRequest,
    id: number,
  ): Promise<void> {
    try {
      await fetchEditTask(taskChanges, id);
      await onUpdate();
    } catch (error) {
      if (error instanceof Error) alert(error.message);
      throw error;
    }
  }

  async function handleEditFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const errorMessage = titleValidation(editTaskTitle.trim());

    if (errorMessage) {
      setErrorValid(errorMessage);
      return;
    }

    await updateTodo({ title: editTaskTitle.trim() }, task.id);
    setIsEdit(false);
    setErrorValid("");
  }

  function handleToggleEdit() {
    if (isEdit === false) setEditTaskTitle(task.title);
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
      if (error instanceof Error) alert(error.message);
    }
  }

  async function handleToggleTask(isDone: boolean, id: number) {
    await updateTodo({ isDone: !isDone }, id);
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
                type="button"
              >
                <img src="/src/assets/Group.svg" />
              </IconButton>

              <IconButton
                ariaLabel="delete"
                variant="danger"
                onClick={() => handleDeleteTask(task.id)}
                type="button"
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
