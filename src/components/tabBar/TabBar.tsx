import Tab from "./Tab";
//이미지 import 필요

interface TabBarProps {
  selectedTab: string;
  onSelect: (tabName: string) => void;
}

export default function TabBar({ selectedTab, onSelect }: TabBarProps) {
  const tabs = [
    {
      title: "냉장고",
      image: "/icons/fridge_off.svg",
      selectedImage: "/icons/fridge_on.svg",
    },
    {
      title: "레시피",
      image: "/icons/recipe_off.svg",
      selectedImage: "/icons/recipe_on.svg",
    },
    {
      title: "쿠킵스",
      image: "/icons/cookips_off.svg",
      selectedImage: "/icons/cookips_on.svg",
    },
    {
      title: "MY쿠킵",
      image: "/icons/my_off.svg",
      selectedImage: "/icons/my_on.svg",
    },
  ];
  return (
    <nav
      className="
        fixed bottom-0 z-50
        left-1/2 -translate-x-1/2
        w-full max-w-[450px]
        flex flex-col
        bg-white 
      "
    >
      <div className="flex justify-around items-center w-full px-4 h-14">
        {tabs.map((tab) => (
          <Tab
            key={tab.title}
            image={tab.image}
            selectedImage={tab.selectedImage}
            title={tab.title}
            isSelected={selectedTab === tab.title}
            onClick={() => onSelect(tab.title)}
          />
        ))}
      </div>
      <div className="h-[34px] bg-white"></div>
    </nav>
  );
}
