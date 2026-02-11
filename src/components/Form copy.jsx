import { useState } from "react";

export default function Form({ onUpdate}) {
  const [title, setTitle] = useState("");
  const [errorValid, setErrorValid] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    //валидация
    if (
      !title ||
      title.trim().length === 0 ||
      title.length < 2 ||
      title.length >= 64
    ) {
      setErrorValid("данное поле должно содержать от 2 до 64 символов");
      return setTitle("");
    } else {
      setErrorValid("");
    }

    //добавление задачи
    const newTask = { title, isDone: false };
    //
    //1 await addTask
      const responseTask = await addTask(newTask);

      // const allTasks = await getTasks();
    onUpdate(newTask);

    //сделать запрос на бэк
    //почитать - разница умные и тупые компоненты (presintation components, pure comp)

    // 2 - код создания задачи - обновить список задач

    // onAddItems(newTask);
    // console.log(updateTaskList);
    // console.log(newTask);
    // setItems(allTasks);
    setTitle("");
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task To Be Done..."
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          maxLength={64}
        />
        {errorValid && (
          <p style={{ color: "red", fontSize: "10px" }}>{errorValid}</p>
        )}
        <button>Add</button>
      </form>
    </div>
  );
}
