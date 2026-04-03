import { useMemo, useState } from "react";
import { searchIcon } from "../../../assets";
import TextField from "../../ui/TextField";

// 임시 데이터 (나중에 API로 대체)
const DUMMY_INGREDIENTS = [
  "고구마",
  "감자",
  "당근",
  "양파",
  "오이",
  "우유",
  "초코우유",
  "딸기우유",
  "땅콩",
  "복숭아",
];

export default function Preference() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const hasText = searchTerm.length > 0;

  // 1. 검색 로직: 입력값에 따라 리스트 필터링
  const filteredIngredients = useMemo(() => {
    if (!hasText) return [];
    return DUMMY_INGREDIENTS.filter(
      (item) =>
        item.includes(searchTerm) && !selectedIngredients.includes(item),
    );
  }, [searchTerm, selectedIngredients]);

  // 2. 재료 선택/삭제 핸들러
  const handleSelect = (ingredient: string) => {
    setSelectedIngredients((prev) => [...prev, ingredient]);
    setSearchTerm(""); // 선택 후 검색창 초기화
  };

  const handleRemove = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.filter((item) => item !== ingredient),
    );
  };

  return (
    <>
      <div className="w-[361px] mt-[46px]">
        <h1 className="typo-h1 !text-[22px]">먹지 못하는 식재료가 있나요?</h1>
        <h3 className="typo-h3 text-gray-500">
          해당 재료는 레시피에서 제외할게요
        </h3>
      </div>
      <div className="mt-[46px] flex flex-col items-center">
        <div
          className="
          relative
          rounded-[6px]
          overflow-hidden
          [&_p]:hidden
          [&_input]:w-full
          [&_input]:outline-none 
          [&_input::placeholder]:text-[#7D7D7D]
      "
        >
          <TextField
            value={searchTerm}
            type="text"
            placeholder="찾으시는 재료가 있나요? (ex. 고구마, 초코우유...)"
            onChange={(e) => setSearchTerm(e.target.value)}
            rightIcon={
              <div className="flex items-center justify-center transition-opacity duration-200">
                <img
                  src={searchIcon}
                  alt="search"
                  className={hasText ? "cursor-pointer" : "cursor-default"}
                />
              </div>
            }
          />
        </div>
      </div>
    </>
  );
}
