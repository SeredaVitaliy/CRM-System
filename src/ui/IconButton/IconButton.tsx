import styles from "./IconButton.module.css";

type Variant = "edit" | "delete" | "save" | "return";

type IconButtonProps = {
  type?: "submit" | "button";
  variant: Variant;
  onClick?: () => void;
  ariaLabel: string;
};

export default function IconButton({
  onClick,
  ariaLabel,
  type,
  variant,
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${styles.iconBtn} ${styles[variant]}`}
      aria-label={ariaLabel}
      type={type}
    ></button>
  );
}
