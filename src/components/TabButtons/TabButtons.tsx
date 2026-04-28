import { TodoFilter, TodoInfo } from "../../types/types";

import styles from "./TabButtons.module.css";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

interface Props {
  todoInfo: TodoInfo;
  onSelectedTab: (selectedTab: TodoFilter) => void;
}

export default function TabButtons({ todoInfo, onSelectedTab }: Props) {
  const onChange = (key: TodoFilter) => {
    onSelectedTab(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "all",
      label: `Все(${todoInfo.all})`,
    },
    {
      key: "inWork",
      label: `в работе(${todoInfo.inWork})`,
    },
    {
      key: "completed",
      label: `сделано(${todoInfo.completed})`,
    },
  ];

  return (
    <menu className={styles.tabsButtons}>
      <Tabs centered items={items} onChange={onChange} />
    </menu>
  );
}
