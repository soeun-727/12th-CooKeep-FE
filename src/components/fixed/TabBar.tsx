import Tab from "./Tab";
import fridgeIcon from "../../assets/fixed/fridge.svg";
import fridgeOnIcon from "../../assets/fixed/Vector-1.svg";
import recipeIcon from "../../assets/fixed/recipe.svg";
import recipeOnIcon from "../../assets/fixed/Vector-5.svg";
import cookeepsIcon from "../../assets/fixed/cookeeps.svg";
import cookeepsOnIcon from "../../assets/fixed/Vector-7.svg";
import mycookeepIcon from "../../assets/fixed/mycookeep.svg";
import mycookeepOnIcon from "../../assets/fixed/Vector-3.svg";
import { useNavigate } from "react-router-dom";

interface TabBarProps {
  selectedTab: string;
  onSelect: (tabName: string) => void;
}

export default function TabBar({ selectedTab, onSelect }: TabBarProps) {
  const navigate = useNavigate();
  const handleSelect = (name: string) => {
    onSelect(name);

    if (name === "냉장고") navigate("/fridge");
    else if (name === "레시피") navigate("/recipe");
    else if (name === "쿠킵스") navigate("/cookeeps");
    else if (name === "MY쿠킵") navigate("/mypage");
  };

  const tabs = [
    { title: "냉장고", image: fridgeIcon, selectedImage: fridgeOnIcon },
    { title: "레시피", image: recipeIcon, selectedImage: recipeOnIcon },
    { title: "쿠킵스", image: cookeepsIcon, selectedImage: cookeepsOnIcon },
    { title: "MY쿠킵", image: mycookeepIcon, selectedImage: mycookeepOnIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      <div className="mx-auto max-w-[450px] pointer-events-auto">
        <div className="bg-white h-14 flex justify-around items-center">
          {tabs.map((tab) => (
            <Tab
              key={tab.title}
              image={tab.image}
              selectedImage={tab.selectedImage}
              title={tab.title}
              isSelected={selectedTab === tab.title}
              onClick={() => handleSelect(tab.title)}
            />
          ))}
        </div>
        <div className="h-[34px] bg-white" />
      </div>
    </nav>
  );
}
