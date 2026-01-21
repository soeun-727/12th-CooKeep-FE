import plus from "../../../assets/fridge/plus.svg";
import plusDisabled from "../../../assets/fridge/plusDisabled.svg";
import Item from "../items/Item";
import character from "../../../assets/fridge/character.svg"; // 오타 수정: charcter -> character
import { useIngredientStore } from "../../../stores/useIngredientStore";
import type { Ingredient } from "../../../stores/useIngredientStore";

interface StorageProps {
  category: string;
  image: string;
  ingredients: Ingredient[];
}

export default function Storage({
  category,
  image,
  ingredients,
}: StorageProps) {
  const { selectedIds, toggleSelect, setViewCategory } = useIngredientStore();
  const { openDetail } = useIngredientStore(); // 상세정보부분 추가
  // 3개 이상일 때만 전체보기가 활성화되도록 설정된 로직 유지
  const isScrollable = ingredients.length >= 3;

  return (
    <div className="relative w-full min-h-[173px] z-0">
      {/* 배경 레이어 */}
      <div className="absolute inset-0 -z-10 flex flex-col overflow-hidden pointer-events-none">
        <div className="w-full h-[115px] rounded-t-[36px] bg-[#BFC6D740]" />
        <div className="relative w-full bg-[#C8CFE2] h-12">
          <div className="absolute inset-0 flex gap-[6px] items-center justify-center pt-[7px]">
            <div className="w-[114px] h-[26px] rounded-[7px] bg-[#ADB4C766]" />
            <div className="w-[114px] h-[26px] rounded-[7px] bg-[#ADB4C766]" />
            <div className="w-[114px] h-[26px] rounded-[7px] bg-[#ADB4C766]" />
          </div>
        </div>
        <div className="w-full bg-[#ADB4C7] h-[10px]" />
      </div>

      {/* 상단 헤더 영역 */}
      <div className="max-w-[393px] mx-auto">
        <div className="relative z-10 px-[20px] pt-[5px] pb-5">
          <div className="flex justify-between w-full h-10 items-center">
            {/* 왼쪽 카테고리 태그: Sort.tsx와 동일하게 justify-center 추가 */}
            <div className="flex items-center justify-center bg-neutral-800 rounded-[6px] h-[22px] min-w-[59px] px-2 gap-1 text-white">
              <img src={image} alt="category" className="w-3 h-3" />
              <span className="typo-caption leading-none whitespace-nowrap">
                {category}
              </span>
            </div>

            {/* 오른쪽 전체보기 버튼 */}
            <button
              disabled={!isScrollable}
              onClick={() => setViewCategory(category)}
              className="flex items-center gap-1 group transition-all active:scale-95"
            >
              <span
                className={`typo-caption font-semibold transition-colors ${
                  isScrollable
                    ? "text-[var(--color-green-deep)]"
                    : "text-[#BFC6D7]"
                }`}
              >
                전체보기
              </span>
              <img
                src={isScrollable ? plus : plusDisabled}
                className="w-3 transition-opacity"
                alt="plus"
              />
            </button>
          </div>
        </div>
      </div>

      {/* 아이템 리스트 영역 */}
      <div
        className={`relative w-[353px] z-10 mx-auto ${
          ingredients.length > 0 ? "overflow-hidden" : ""
        }`}
      >
        {ingredients.length > 0 ? (
          <div className="flex gap-[6px] overflow-x-auto no-scrollbar pb-2">
            {ingredients.map((item) => (
              <div key={item.id} className="flex-shrink-0">
                <Item
                  name={item.name}
                  leftDays={item.dDay}
                  image={item.image}
                  isSelected={selectedIds.includes(item.id)}
                  onSelect={() => toggleSelect(item.id)}
                  onDetail={() => openDetail(item)}
                />
              </div>
            ))}
            {/* 끝부분 여백 확보 */}
            <div className="w-4 flex-shrink-0" />
          </div>
        ) : (
          /* 데이터가 없는 경우 Empty State */
          <div className="flex flex-col items-center gap-3 mt-[-5px] animate-fadeIn">
            <img
              src={character}
              className="w-[45.6px] opacity-80"
              alt="empty"
            />
            <span className="typo-caption text-[#7A8093] font-medium">
              재료를 등록해주세요
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
