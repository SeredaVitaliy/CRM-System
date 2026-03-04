import styles from "./IconButton.module.css";

export default function IconButton({ onClick, ariaLabel, type, variant = "" }) {
  return (
    <button
      onClick={onClick}
      className={`${styles.iconBtn} ${styles[variant]}`}
      aria-label={ariaLabel}
      type={type}
    ></button>
  );
}
