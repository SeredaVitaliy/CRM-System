import styles from "./IconButton.module.css";

export default function IconButton({
  onClick,
  className = "",
  ariaLabel,
  type,
}) {
  return (
    <button
      onClick={onClick}
      className={`${styles.iconBtn} ${className}`}
      aria-label={ariaLabel}
      type={type}
    ></button>
  );
}
