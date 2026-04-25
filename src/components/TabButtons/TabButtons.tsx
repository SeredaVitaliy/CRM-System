import { TodoFilter, TodoInfo } from "@/types/types";
import TabButton from "../../ui/TabButton/TabButton";
import styles from "./TabButtons.module.css";

interface Props {
  selectedTab: TodoFilter;
  todoInfo: TodoInfo;
  onSelectedTab: (selectedTab: TodoFilter) => void;
}

export default function TabButtons({
  selectedTab,
  todoInfo,
  onSelectedTab,
}: Props) {
  return (
    <menu className={styles.tabsButtons}>
      <TabButton
        isSelected={selectedTab === "all"}
        onSelect={() => onSelectedTab("all")}
      >
        Все ({todoInfo.all})
      </TabButton>
      <TabButton
        isSelected={selectedTab === "inWork"}
        onSelect={() => onSelectedTab("inWork")}
      >
        в работе ({todoInfo.inWork})
      </TabButton>
      <TabButton
        isSelected={selectedTab === "completed"}
        onSelect={() => onSelectedTab("completed")}
      >
        сделано ({todoInfo.completed})
      </TabButton>
    </menu>
  );
}
