import styles from "./CheckBox.module.css";

export default function CheckBox({ checked, onChange, type }) {
  return (
    <label className={styles.checkbox}>
      <input type={type} checked={checked} onChange={onChange} />
    </label>
  );
}
