import { useEffect, useState } from "react";
import TabButton from "./components/TabButton";
import Form from "./components/Form";
import Item from "./components/Item";
import { addTask, deleteTask, fetchingTasks } from "./FetchingTasks";

export function App() {
  // const [tabContent, setTabContent] = useState("");
  //tasks
  const [tasks, setTasks] = useState([]); // передаются в форму и используется для вывода в айтемЛист

  async function handleAddTask(tasks) {
    const responseTask = await addTask(tasks);

    const allTasks = await getTasks();

    // setItems(allTasks);
    fetchingTasks();
  }

  //Редактирование задачи
  // async function handleEditTaskTitle(newTitle, id) {
  //   await fetchEditTitleTask({ title: newTitle }, id);

  //   // let newTitle = items.map((item) => (item.title = updateTaskTitle));
  //   // 1; ///
  //   // setItems(items.map((item) => (item.title = newTitle)));
  //   ///
  //   setItems((tasks) =>
  //     tasks.map((task) =>
  //       task.id === id ? { ...task, title: newTitle } : task,
  //     ),
  //   );
  //   // console.log(updateTaskTitle);
  }
  ////////////
  // function handleSelectTab(selectedButton) {
  //   setTabContent(selectedButton);
  //   console.log(selectedButton);
  // }

  function handleDeletedTask(id) {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
    deleteTask(id);
  }
  console.log(tasks);

  //функция для пометки выполненно для чекбокса
  // function handleToggleItem(id) {
  //   setItems((items) =>
  //     items.map((item) =>
  //       item.id === id ? { ...item, isDone: !item.isDone } : item,
  //     ),
  //   );
  // }

  // отправка запроса на сервер
  useEffect(function () {
    async function fetchTasks() {
      const data = await fetchingTasks();

      setTasks(data);
      console.log(data);
    }
    fetchTasks();
  }, []);

  return (
    <div>
      <Form onUpdate={handleAddTask} />
      <section className="examples">
        {/* <menu>
          <TabButton onSelect={() => handleSelectTab("all")}>Все(х)</TabButton>
          <TabButton onSelect={() => handleSelectTab("inWork")}>
            в работе(х)
          </TabButton>
          <TabButton onSelect={() => handleSelectTab("completed")}>
            сделано(х)
          </TabButton>
        </menu> */}
        {/* {tabContent} */}
      </section>
      <ItemList
        tasks={tasks}
        onDeleteTask={handleDeletedTask}
        // onToggleItems={handleToggleItem}
        // onEditTaskTitle={handleEditTaskTitle}
      />
    </div>
  );
}

export default function ItemList({
  items,
  onDeleteTask,
  onToggleItems,
  onEditTaskTitle,
}) {
  return (
    <ul>
      {items.map((item) => (
        <Item
          item={item}
          key={item.id}
          onDeleteTask={onDeleteTask}
          onToggleItems={onToggleItems}
          onEditTaskTitle={onEditTaskTitle}
        />
      ))}
    </ul>
  );
}
