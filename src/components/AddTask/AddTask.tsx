import { FormEvent, useState } from "react";
import styles from "./AddTask.module.css";
import { addTask } from "../../api/TodoApi.ts";
import titleValidation from "../../utils/validator.ts";
import Button from "../../ui/Button/Button.js";

type AddTaskProps = {
  onUpdate: () => Promise<void>;
};

export default function AddTask({ onUpdate }: AddTaskProps) {
  const [title, setTitle] = useState<string>("");
  const [errorValid, setErrorValid] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
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
      if (error instanceof Error) {
        alert(error);
        setErrorValid(error.message);
      }
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
