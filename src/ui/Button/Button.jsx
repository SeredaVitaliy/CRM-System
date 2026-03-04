import styles from "./Button.module.css";

export default function Button({ children, onClick, variant = "" }) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[variant]}`}>
      {children}
    </button>
  );
}
