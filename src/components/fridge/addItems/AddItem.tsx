import { useEffect } from "react";
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
import milk from "../../../assets/fridge/milk.svg";

import Category from "./components/Category";
import ItemsGrid from "./components/ItemsGrid";
import AddItemFooter from "./AddItemFooter";
import { useAddIngredientStore } from "../../../stores/useAddIngredientStore";
import Custom from "./components/Custom";

export default function AddItem() {
  const {
    searchTerm,
    setSearchTerm,
    selectedCategoryId,
    setCategoryId,
    setHistoryItems,
    isModalOpen,
    setModalOpen,
    toggleItem,
  } = useAddIngredientStore();

  useEffect(() => {
    const mockHistory = [
      { id: 101, name: "당근", image: veg, categoryId: 1 },
      { id: 102, name: "사과", image: fruit, categoryId: 2 },
      { id: 103, name: "삼겹살", image: meat, categoryId: 3 },
    ];
    setHistoryItems(mockHistory);
  }, [setHistoryItems]);

  const filteredItems = ALL_ITEMS.filter((item) => {
    const matchesCategory = item.categoryId === selectedCategoryId;
    const matchesSearch = item.name.includes(searchTerm);
    return matchesCategory && matchesSearch;
  });
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
                  isSelected={selectedCategoryId === category.id}
                  onSelect={() => setCategoryId(category.id)}
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <ItemsGrid items={filteredItems} />
        </div>
        <AddItemFooter />
      </div>
      {isModalOpen && (
        <Custom
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          categories={TEMP_CATEGORY}
          onConfirm={(categoryId) => {
            toggleItem({
              id: `custom-${Date.now()}`,
              name: searchTerm,
              image: elseIcon,
              categoryId: categoryId,
            });
            setModalOpen(false);
          }}
        />
      )}
    </>
  );
}

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
const ALL_ITEMS = [
  { id: 1001, categoryId: 1, name: "당근", image: milk },
  { id: 1002, categoryId: 1, name: "양파", image: milk },
  { id: 1003, categoryId: 1, name: "대파", image: milk },
  { id: 2001, categoryId: 2, name: "사과", image: milk },
  { id: 2002, categoryId: 2, name: "바나나", image: milk },
  { id: 3001, categoryId: 3, name: "소고기", image: milk },
  { id: 3002, categoryId: 5, name: "우유", image: milk },
  { id: 3003, categoryId: 5, name: "우유", image: milk },
  { id: 3004, categoryId: 5, name: "우유", image: milk },
  { id: 3005, categoryId: 5, name: "우유", image: milk },
  { id: 3006, categoryId: 5, name: "우유", image: milk },
  { id: 3007, categoryId: 5, name: "우유", image: milk },
  { id: 3008, categoryId: 5, name: "우유", image: milk },
  { id: 3009, categoryId: 5, name: "우유", image: milk },
  { id: 3010, categoryId: 5, name: "우유", image: milk },
  { id: 3011, categoryId: 5, name: "우유", image: milk },
  { id: 3012, categoryId: 5, name: "우유", image: milk },
  { id: 3013, categoryId: 5, name: "우유", image: milk },
  { id: 3014, categoryId: 5, name: "우유", image: milk },
  { id: 3015, categoryId: 5, name: "우유", image: milk },
  { id: 3016, categoryId: 5, name: "우유", image: milk },
  { id: 3017, categoryId: 5, name: "우유", image: milk },
  { id: 3018, categoryId: 5, name: "우유", image: milk },
  { id: 3019, categoryId: 5, name: "우유", image: milk },
  { id: 3020, categoryId: 5, name: "우유", image: milk },
  { id: 3021, categoryId: 5, name: "우유", image: milk },
  { id: 3022, categoryId: 5, name: "우유", image: milk },
  { id: 3023, categoryId: 5, name: "우유", image: milk },
  { id: 3024, categoryId: 5, name: "우유", image: milk },
  { id: 3025, categoryId: 5, name: "우유", image: milk },
  { id: 3026, categoryId: 5, name: "우유", image: milk },
  { id: 3027, categoryId: 5, name: "우유", image: milk },
  { id: 3028, categoryId: 5, name: "우유", image: milk },
  { id: 3029, categoryId: 5, name: "우유", image: milk },
  { id: 3030, categoryId: 5, name: "우유", image: milk },
  { id: 3031, categoryId: 5, name: "우유", image: milk },
  { id: 3032, categoryId: 5, name: "우유", image: milk },
  { id: 3033, categoryId: 5, name: "우유", image: milk },
  { id: 3034, categoryId: 5, name: "우유", image: milk },
  { id: 3035, categoryId: 5, name: "우유", image: milk },
  { id: 3036, categoryId: 5, name: "우유", image: milk },
  { id: 3037, categoryId: 5, name: "우유", image: milk },
];
