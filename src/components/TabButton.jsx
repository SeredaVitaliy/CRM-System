export default function TabButton({ children, onSelect, isSelected }) {
  return (
    <li>
      <button
        className={isSelected ? "tabs tabs--active" : "tabs"}
        onClick={onSelect}
      >
        {children}
      </button>
    </li>
  );
}
