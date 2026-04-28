import { ReactNode } from "react";
import styles from "./Button.module.css";
import { Button } from "antd";
import type { ConfigProviderProps } from "antd";

type htmlType = "submit" | "button" | "reset";

interface Props {
  onClick?: () => void;
  variant: "primary";
  children: ReactNode;
  htmlType: htmlType;
  size: SizeType;
}

type SizeType = ConfigProviderProps["componentSize"];

export default function ButtonAnt({
  children,
  onClick,
  variant,
  htmlType,
  size,
}: Props) {
  return (
    <Button
      htmlType={htmlType}
      size={size}
      onClick={onClick}
      className={`${styles.btn} ${styles[variant]}`}
    >
      {children}
    </Button>
  );
}
