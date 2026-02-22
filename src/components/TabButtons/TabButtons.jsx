import TabButton from "../../ui/TabButton/TabButton";

export default function TabButtons({ selectedTab, todoInfo, onSelectedTab }) {
  return (
    <>
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
    </>
  );
}
