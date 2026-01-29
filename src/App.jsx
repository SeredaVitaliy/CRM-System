import { useState } from "react";
import { Form } from "./components/Form";
import TabButton from "./components/TabButton";

const initialTask = [{ id: 1, completed: false, task: "dasd" }];

export function App() {
  const [tabContent, setTabContent] = useState("");
  const [items, setItems] = useState([]); // передаются в форму и используется для вывода в айтемЛист

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleSelectTab(selectedButton) {
    setTabContent(selectedButton);
    console.log(selectedButton);
  }

  return (
    <div>
      <Form onAddItems={handleAddItems} />
      <section className="examples">
        <menu>
          <TabButton onSelect={() => handleSelectTab("all")}>Все(х)</TabButton>
          <TabButton onSelect={() => handleSelectTab("inWork")}>
            в работе(х)
          </TabButton>
          <TabButton onSelect={() => handleSelectTab("completed")}>
            сделано(х)
          </TabButton>
        </menu>
        {tabContent}
      </section>
      <ItemList items={items} />
    </div>
  );
}

export default function ItemList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <Item item={item} key={item.id} />
      ))}
    </ul>
  );
}

export function Item({ item }) {
  return (
    <li>
      <span style={item.completed ? { textDecoration: "line-through" } : {}}>
        {item.task}
      </span>
      <button>&times;</button>
    </li>
  );
}
