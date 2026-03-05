import styles from "./TabButton.module.css";

export default function TabButton({ children, onSelect, isSelected }) {
  return (
    <li>
      <button
        type="button"
        className={
          isSelected
            ? `${styles.tabs} ${styles["tabs--active"]}`
            : `${styles.tabs}`
        }
        onClick={onSelect}
      >
        {children}
      </button>
    </li>
  );
}
