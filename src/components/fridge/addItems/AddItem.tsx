import { useEffect, useState } from "react";
import TextField from "../../ui/TextField";
import searchIcon from "../../../assets/fridge/search_on.svg";
import Category from "./components/Category";
import ItemsGrid from "./components/ItemsGrid";
import AddItemFooter from "./AddItemFooter";
import {
  useAddIngredientStore,
  type MasterItem,
} from "../../../stores/useAddIngredientStore";
import Custom from "./components/Custom";
import {
  getMasterIngredientList,
  type MasterIngredientListResponse,
} from "../../../api/ingredient";
import { DEFAULT_EXPIRY_DAYS } from "../../../constants/expiry";
import { calculateExpiryDate } from "../../../utils/expiryDate";
import { INGREDIENT_CATEGORIES } from "../../../constants/category";
import defaultChar from "../../../assets/character/default_char.svg";

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

  const [masterItems, setMasterItems] = useState<MasterItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const parseMasterData = (data: MasterIngredientListResponse) => {
    return data.categories.flatMap((cat) => {
      const categoryInfo =
        INGREDIENT_CATEGORIES.find((tc) => tc.serverKey === cat.category) ||
        INGREDIENT_CATEGORIES[12];

      return cat.ingredients.map((ing) => {
        const defaultDays = DEFAULT_EXPIRY_DAYS[cat.category] || 7;
        const days =
          ing.leftDays && ing.leftDays > 0 ? ing.leftDays : defaultDays;
        const formattedExpiry = calculateExpiryDate(days);
        return {
          id: ing.id,
          name: ing.name,
          image: ing.imageUrl,
          categoryId: categoryInfo.id,
          type: "DEFAULT" as const,
          storageType: "FRIDGE" as const,
          unit: "PIECE" as const,
          expiration: formattedExpiry,
          quantity: 1,
        } as MasterItem;
      });
    });
  };

  useEffect(() => {
    const fetchMasterList = async () => {
      try {
        setIsLoading(true);
        const response = await getMasterIngredientList();

        if (response.data && response.data.data) {
          const parsed = parseMasterData(response.data.data);
          setMasterItems(parsed);
          setHistoryItems(parsed.slice(0, 3));
        }
      } catch (error) {
        console.error("마스터 목록 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMasterList();
  }, [setHistoryItems]);

  const filteredItems = masterItems.filter((item) => {
    const matchesCategory = item.categoryId === selectedCategoryId;
    const matchesSearch = item.name.includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  if (isLoading)
    return <div className="mt-20 text-center">식재료를 불러오는 중...</div>;

  return (
    <>
      <div className="flex flex-col items-center mt-1">
        <div className="[&_p]:hidden [&_input]:border-none [&_input]:outline-none [&_input::placeholder]:text-stone-300 shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)]">
          <TextField
            value={searchTerm}
            placeholder="재료명을 검색하세요"
            onChange={(value) => setSearchTerm(value)}
            rightIcon={<img src={searchIcon} className="" />}
          />
        </div>
        <div className="mt-4 pl-[31px] w-[401px]">
          <div className="flex gap-[6px] overflow-x-auto no-scrollbar scroll-smooth">
            {INGREDIENT_CATEGORIES.map((category) => (
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
          categories={INGREDIENT_CATEGORIES}
          onConfirm={(serverData) => {
            const newId = serverData.customIngredientId;

            const selectedCat = INGREDIENT_CATEGORIES.find(
              (c) => c.id === selectedCategoryId,
            );
            const serverKey = selectedCat?.serverKey || "ETC";
            const defaultDays = DEFAULT_EXPIRY_DAYS[serverKey] || 7;

            toggleItem({
              id: newId,
              name: serverData.name || searchTerm,
              image: serverData.imageUrl || defaultChar,
              categoryId: selectedCategoryId || 13,
              type: "CUSTOM" as const,
              storageType: "FRIDGE" as const,
              unit: "PIECE" as const,
              expiration: calculateExpiryDate(defaultDays),
              quantity: 1,
            } as MasterItem);
            setModalOpen(false);
          }}
        />
      )}
    </>
  );
}
