import { useState } from "react";

export function Form({ onAddItems }) {
  const [task, setTask] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!task) return;

    const newItem = { id: 2, completed: false, task };

    onAddItems(newItem);
    console.log(newItem);
    setTask("");
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task To Be Done..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button>Add</button>
      </form>
    </div>
  );
}
