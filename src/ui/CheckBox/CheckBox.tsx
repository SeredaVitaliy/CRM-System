import styles from "./CheckBox.module.css";

interface Props {
  checked: boolean;
  onChange: () => void;
  type: "checkbox";
}

export default function CheckBox({ checked, onChange, type }: Props) {
  return (
    <label className={styles.checkbox}>
      <input type={type} checked={checked} onChange={onChange} />
    </label>
  );
}
