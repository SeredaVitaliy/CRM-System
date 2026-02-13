import { useState } from "react";

export default function InputTask({ onUpdate }) {
  const [title, setTitle] = useState("");
  const [errorValid, setErrorValid] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    //валидация
    if (!title || title.trim().length === 0) {
      setErrorValid("Это поле не может быть пустым");
      return setTitle("");
    }
    if (title.length < 2) {
      setErrorValid("Минимальная длина текста 2 символа");
      return setTitle("");
    }
    if (title.length >= 64) {
      setErrorValid("Максимальная длина текста 64 символа");
      return setTitle("");
    } else {
      setErrorValid("");
    }

    //  добавление задачи
    const newTask = { title, isDone: false };

    onUpdate(newTask);

    setTitle("");
  }
  return (
    <>
      <form onSubmit={handleSubmit} style={{ display: "flex" }} noValidate>
        <input
          className="form form-add"
          type="text"
          placeholder="Task To Be Done..."
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          maxLength={64}
        />
        <button className="btn btn-add">Add</button>
      </form>
      {errorValid && (
        <p
          style={{
            color: "red",
            fontSize: "10px",
            marginLeft: "50px",
          }}
        >
          {errorValid}
        </p>
      )}
    </>
  );
}
