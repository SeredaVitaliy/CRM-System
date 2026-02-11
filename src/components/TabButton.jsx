export default function TabButton({ children, onSelect }) {
  return (
    <li>
      <button
        style={{ backgroundColor: "blue", border: "none" }}
        onClick={onSelect}
      >
        {children}
      </button>
    </li>
  );
}
