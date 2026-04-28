import { ReactNode } from "react";
import styles from "./IconButton.module.css";
import { Variant } from "../../types/types";

type htmlType = "submit" | "button";

type SizeType = ConfigProviderProps["componentSize"];

interface Props {
  variant: Variant;
  onClick?: () => void;
  ariaLabel: string;
  children?: ReactNode;
  icon: ReactNode;
  htmlType: htmlType;
  size: SizeType;
}

import { Button, ConfigProviderProps } from "antd";

export default function IconButton({
  onClick,
  ariaLabel,
  variant,
  children,
  icon,
  htmlType,
  size,
}: Props) {
  return (
    <Button
      onClick={onClick}
      className={`${styles.iconBtn} ${styles[variant]}`}
      aria-label={ariaLabel}
      type="primary"
      icon={icon}
      htmlType={htmlType}
      size={size}
    >
      {children}
    </Button>
  );
}
