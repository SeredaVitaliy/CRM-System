import styles from "./CheckBox.module.css";

type CheckBoxProps = {
  checked: boolean;
  onChange: () => void;
  type: "checkbox";
};

export default function CheckBox({ checked, onChange, type }: CheckBoxProps) {
  return (
    <label className={styles.checkbox}>
      <input type={type} checked={checked} onChange={onChange} />
    </label>
  );
}
