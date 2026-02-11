import { useState } from "react";

export default function Item({ task, editingTask, onDeleteTask, onToggle }) {
  const [isEdit, setIsEdit] = useState(false); // стейт для редактирования
  const [editTaskTitle, setEditTaskTitle] = useState(task.title);

  function handleSaveClick() {
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

  let editableTaskTitle = <span>{editTaskTitle}</span>;

  if (isEdit) {
    editableTaskTitle = <input value={editTaskTitle} onChange={handleChange} />;
  }

  // console.log(editTaskTitle);
  // console.log(setEditTaskTitle)
  return (
    <li>
      <input
        type="checkbox"
        checked={task.isDone}
        onChange={() => onToggle(task.isDone, task.id)}
      />
      <span style={task.isDone ? { textDecoration: "line-through" } : {}}>
        {editableTaskTitle}
      </span>
      {isEdit ? (
        <>
          <button onClick={handleSaveClick}>Сохранить</button>
          <button onClick={handleReturnClick}>Отмена</button>
        </>
      ) : (
        <button onClick={handleEditClick}>Изменить</button>
      )}

      {isEdit ? "" : <button onClick={() => onDeleteTask(task.id)}>x</button>}
    </li>
  );
}
