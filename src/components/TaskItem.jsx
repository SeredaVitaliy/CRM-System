import { useState } from "react";

export default function TaskItem({
  task,
  editingTask,
  onDeleteTask,
  onToggle,
}) {
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

  let editableTaskTitle = editTaskTitle;

  if (isEdit) {
    editableTaskTitle = (
      <input
        className="form form-edit"
        value={editTaskTitle}
        onChange={handleChange}
      />
    );
  }

  // console.log(editTaskTitle);
  // console.log(setEditTaskTitle)
  return (
    <li className="tasks">
      <div className="checkbox">
        <input
          className="checkbox-input"
          type="checkbox"
          checked={task.isDone}
          onChange={() => onToggle(task.isDone, task.id)}
        />

        <span style={task.isDone ? { textDecoration: "line-through" } : {}}>
          {editableTaskTitle}
        </span>
      </div>
      <div style={{ display: "flex" }}>
        {isEdit ? (
          <div style={{ display: "grid", gap: "5px" }}>
            <button className="btn btn-save-res" onClick={handleSaveClick}>
              Сохранить
            </button>
            <button className="btn btn-save-res" onClick={handleReturnClick}>
              Отмена
            </button>
          </div>
        ) : (
          <button className="btn btn-edit" onClick={handleEditClick}></button>
        )}

        {isEdit ? (
          ""
        ) : (
          <button
            className="btn btn-del"
            onClick={() => onDeleteTask(task.id)}
          ></button>
        )}
      </div>
    </li>
  );
}
