import { ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  onClick?: () => void;
  variant: "primary";
  children: ReactNode;
};

export default function Button({ children, onClick, variant }: ButtonProps) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[variant]}`}>
      {children}
    </button>
  );
}
