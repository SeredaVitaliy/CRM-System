import { ReactNode } from "react";
import styles from "./Button.module.css";

interface Props {
  onClick?: () => void;
  variant: "primary";
  children: ReactNode;
}

export default function Button({ children, onClick, variant }: Props) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[variant]}`}>
      {children}
    </button>
  );
}
