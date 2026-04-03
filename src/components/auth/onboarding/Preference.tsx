import { useMemo, useState } from "react";
import { searchIcon } from "../../../assets";
import searchOnIcon from "../../../assets/fridge/search_on.svg";
import TextField from "../../ui/TextField";
import xIcon from "../../../assets/onboarding/x.svg";

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

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return <span>{text}</span>;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, i) => (
          <span
            key={i}
            className={
              part.toLowerCase() === highlight.toLowerCase()
                ? "text-(--color-green-deep)" // 원하는 초록색 계열로 설정
                : ""
            }
          >
            {part}
          </span>
        ))}
      </span>
    );
  };

  // 1. 검색 로직: 입력값에 따라 리스트 필터링
  const filteredIngredients = useMemo(() => {
    if (!hasText) return [];
    return DUMMY_INGREDIENTS.filter(
      (item) =>
        item.includes(searchTerm.trim()) && !selectedIngredients.includes(item),
    );
  }, [searchTerm, selectedIngredients]);

  const isDropdownOpen = hasText && filteredIngredients.length > 0;

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
      <div className="relative mt-[46px] flex flex-col items-center">
        <div
          className={`
            relative w-[361px] transition-all duration-200
            ${isDropdownOpen ? "rounded-t-[6px] rounded-b-none" : "rounded-[6px]"}
            overflow-hidden
            [&_p]:hidden
            [&_input]:w-full
            typo-body2
            [&_input]:outline-none 
            [&_input::placeholder]:text-[#7D7D7D]
            ${
              isDropdownOpen
                ? `[&_div]:rounded-b-none [&_div]:border-b-0 [&_input]:rounded-b-none [&_input]:border-b-0`
                : ""
            }
          `}
        >
          <TextField
            value={searchTerm}
            type="text"
            placeholder="찾으시는 재료가 있나요? (ex. 고구마, 초코우유...)"
            onChange={setSearchTerm}
            rightIcon={
              <div className="flex items-center justify-center transition-opacity duration-200">
                <img
                  src={hasText ? searchOnIcon : searchIcon}
                  alt="search"
                  className={hasText ? "cursor-pointer" : "cursor-default"}
                />
              </div>
            }
          />
        </div>

        {/* 선택된 재료 */}
        <div className="flex flex-wrap mt-[18px] w-[361px] gap-[6px]">
          {selectedIngredients.map((ingredient) => (
            <div
              key={ingredient}
              onClick={() => handleRemove(ingredient)}
              className="bg-gray-200 px-3 px-1 h-7 flex gap-1 rounded-[100px] items-center"
            >
              <img src={xIcon} className="w-3 h-3" />
              <span className="typo-caption !font-medium text-zinc-500">
                {ingredient}
              </span>
            </div>
          ))}
        </div>

        {hasText && filteredIngredients.length > 0 && (
          <ul className="absolute top-12 w-[361px] bg-white border border-[#DDDDDD] !border-t-0 rounded-b-[6px] z-50 max-h-[200px] overflow-y-auto">
            {filteredIngredients.map((item) => (
              <li
                key={item}
                onClick={() => handleSelect(item)}
                className="h-12 p-3 hover:bg-gray-100 cursor-pointer typo-body2"
              >
                {highlightText(item, searchTerm.trim())}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
