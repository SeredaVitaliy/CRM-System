import { useState } from "react";
import styles from "./AddTask.module.css";
import { addTask } from "../../api/fetchingTasks";
import titleValidation from "../../utils/validator";
import Button from "../../ui/Button/Button";

export default function AddTask({ onUpdate }) {
  const [title, setTitle] = useState("");
  const [errorValid, setErrorValid] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    //валидация
    const errorMessage = titleValidation(title.trim());
    if (errorMessage) {
      setErrorValid(errorMessage);
      return;
    }
    //  добавление задачи
    const newTask = { title: title.trim(), isDone: false };
    setErrorValid("");
    try {
      await addTask(newTask);
      await onUpdate();

      setTitle("");
    } catch (error) {
      alert(error);
      setErrorValid(error.message);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit} className={styles.container} noValidate>
        <input
          className={`${styles.form} ${styles.formAdd}`}
          type="text"
          placeholder="Task To Be Done..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button variant="primary">Add</Button>
      </form>
      {errorValid && <p className={styles.textError}>{errorValid}</p>}
    </>
  );
}
