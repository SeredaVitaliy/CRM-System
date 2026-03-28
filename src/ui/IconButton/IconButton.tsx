import { ReactNode } from "react";
import styles from "./IconButton.module.css";
import { Variant } from "@/types/types";

type IconButtonProps = {
  type?: "submit" | "button";
  variant: Variant;
  onClick?: () => void;
  ariaLabel: string;
  children: ReactNode;
};

export default function IconButton({
  onClick,
  ariaLabel,
  type,
  variant,
  children,
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${styles.iconBtn} ${styles[variant]}`}
      aria-label={ariaLabel}
      type={type}
    >
      {children}
    </button>
  );
}
