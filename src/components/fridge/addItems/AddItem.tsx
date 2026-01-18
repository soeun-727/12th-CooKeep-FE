import { useEffect, useState } from "react";
import TextField from "../../ui/TextField";
import searchIcon from "../../../assets/fridge/search_on.svg";
import veg from "../../../assets/fridge/items/vegatable.svg";
import fruit from "../../../assets/fridge/items/fruit.svg";
import meat from "../../../assets/fridge/items/meat.svg";
import fish from "../../../assets/fridge/items/fish.svg";
import egg from "../../../assets/fridge/items/egg.svg";
import rice from "../../../assets/fridge/items/rice.svg";
import bread from "../../../assets/fridge/items/bread.svg";
import salt from "../../../assets/fridge/items/salt.svg";
import simple from "../../../assets/fridge/items/simple.svg";
import candy from "../../../assets/fridge/items/candy.svg";
import drink from "../../../assets/fridge/items/drink.svg";
import ferment from "../../../assets/fridge/items/fermented.svg";
import elseIcon from "../../../assets/fridge/items/else.svg";
import Category from "./Category";
import ItemsGrid from "./ItemsGrid";
import AddItemFooter from "./AddItemFooter";
import { useNavigate } from "react-router-dom";

export default function AddItem() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [historyItems, setHistoryItems] = useState<any[]>([]);

  useEffect(() => {
    // 임시 데이터: 실제 서비스에서는 최근 사용한 재료 API를 호출하면 좋습니다.
    const mockHistory = [
      { id: 101, name: "당근", image: veg },
      { id: 102, name: "사과", image: fruit },
      { id: 103, name: "삼겹살", image: meat },
    ];
    setHistoryItems(mockHistory);
  }, []);
  const handleSelect = (item: any) => {
    setSelectedItems((prev) => {
      if (prev.find((i) => i.id === item.id)) {
        return prev.filter((i) => i.id !== item.id);
      }
      return [...prev, item];
    });
  };
  const handleReset = () => {
    if (selectedItems.length === 0) return;
    setSelectedItems([]);
  };
  const handleSubmit = async () => {
    if (selectedItems.length === 0) return;
    console.log("등록 완료:", selectedItems);
    navigate("/fridge", {
      state: { message: "재료 등록이 완료되었습니다!" },
    });
  };
  const TEMP_CATEGORY = [
    { id: 1, name: "채소", image: veg },
    { id: 2, name: "과일", image: fruit },
    { id: 3, name: "육류", image: meat },
    { id: 4, name: "해산물", image: fish },
    { id: 5, name: "유제품 · 계란", image: egg },
    { id: 6, name: "곡물 · 쌀 · 면", image: rice },
    { id: 7, name: "베이커리", image: bread },
    { id: 8, name: "양념 · 소스 · 조미료", image: salt },
    { id: 9, name: "즉석 · 간편식", image: simple },
    { id: 10, name: "과자 · 디저트", image: candy },
    { id: 11, name: "음료", image: drink },
    { id: 12, name: "절임 · 발효", image: ferment },
    { id: 13, name: "기타", image: elseIcon },
  ];
  return (
    <>
      <div className="flex flex-col items-center mt-[102px]">
        <div className="[&_p]:hidden [&_input]:border-none [&_input::placeholder]:text-stone-300 shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)]">
          <TextField
            value={searchTerm}
            placeholder="재료명을 검색하세요"
            onChange={(value) => setSearchTerm(value)}
            rightIcon={<img src={searchIcon} className="" />}
          />
        </div>
        <div className="mt-4 pl-[31px] w-[401px]">
          <div className="flex gap-[6px] overflow-x-auto no-scrollbar scroll-smooth">
            {TEMP_CATEGORY.map((category) => (
              <div key={category.id} className="flex-shrink-0">
                <Category
                  name={category.name}
                  image={category.image}
                  isSelected={selectedId === category.id}
                  onSelect={() => setSelectedId(category.id)}
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <ItemsGrid selectedItems={selectedItems} onSelect={handleSelect} />
        </div>
        <AddItemFooter
          selectedItems={selectedItems}
          historyItems={historyItems}
          onReset={handleReset}
          onSubmit={handleSubmit}
          onSelect={handleSelect} // RecentlyAdded에서 클릭 시 호출될 함수
        />
      </div>
    </>
  );
}
