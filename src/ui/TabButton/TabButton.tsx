import { ReactNode } from "react";
import styles from "./TabButton.module.css";

interface Props {
  isSelected: boolean;
  onSelect: () => void;
  children: ReactNode;
}

export default function TabButton({ children, onSelect, isSelected }: Props) {
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
