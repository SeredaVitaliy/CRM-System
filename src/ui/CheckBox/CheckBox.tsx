import styles from "./CheckBox.module.css";
import { Checkbox } from "antd";

interface Props {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
}

export default function CheckBox({ onChange, isChecked }: Props) {
  return (
    <Checkbox
      onChange={(e) => onChange(e.target.checked)}
      checked={isChecked}
      className={styles.checkbox}
    />
  );
}
