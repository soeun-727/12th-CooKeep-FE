import { useEffect, useState } from "react";
import { useIngredientStore } from "../../../stores/useIngredientStore";
import type { Ingredient } from "../../../stores/useIngredientStore";
import character from "../../../assets/character/tip_char.svg";
import memoIcon from "../../../assets/fridge/memo.svg";
import fridgeIcon from "../../../assets/fridge/fridge.svg";
import freezerIcon from "../../../assets/fridge/freezer.svg";
import pantryIcon from "../../../assets/fridge/pantry.svg";
import { calcDDay } from "../../../utils/calcDDay";

interface Props {
  ingredient: Ingredient;
  onClose: () => void;
}

export default function IngredientDetailModal({ ingredient, onClose }: Props) {
  const { updateIngredient } = useIngredientStore();

  // 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const [isEditing, setIsEditing] = useState(false);
  const [memo, setMemo] = useState(ingredient.memo ?? "");
  const [quantity, setQuantity] = useState(String(ingredient.quantity));
  const [unit, setUnit] = useState<Ingredient["unit"]>(ingredient.unit);
  const [expiryDate, setExpiryDate] = useState(ingredient.expiryDate);
  const [location, setLocation] = useState(ingredient.category);

  const getExpiryStatus = (dDay: number) => {
    if (dDay <= 3) {
      return {
        text: "유통기한이 얼마 남지 않았어요",
        color: "text-red-500",
      };
    }
    return {
      text: "유통기한이 넉넉해요",
      color: "text-green-500",
    };
  };

  const storageIconMap = {
    냉장: fridgeIcon,
    냉동: freezerIcon,
    상온: pantryIcon,
  };

  const status = getExpiryStatus(ingredient.dDay);
  const tip = ingredient.tip; // API 연결 전 임시

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* modal box */}
      <div
        className="
    relative z-10
    w-full max-w-[330px]
    max-h-[80vh] overflow-y-auto
    rounded-md
    px-5 py-6
    bg-gradient-to-b from-[#F5F5F5] to-white
    shadow-[0_1px_8.2px_-2px_rgba(17,17,17,0.25)]
    animate-fadeIn
  "
      >
        <div className="flex w-full max-w-[290px] flex-col items-center gap-5 mx-auto">
          {/* 헤더 */}
          <div className="flex w-full items-center gap-4">
            {/* 이미지 영역 */}
            <div className="flex h-[86px] w-[86px] items-center justify-center rounded-[10px] bg-[#E6FBEB]">
              <img
                src={ingredient.image}
                alt={ingredient.name}
                className="h-[60px] w-[60px] rounded-md object-cover"
              />
            </div>

            {/* 텍스트 영역 */}
            <div className="flex flex-1 flex-col items-start gap-1">
              <span className="truncate text-[16px] font-semibold leading-5 text-[#202020]">
                {ingredient.name}
              </span>

              <div className="flex items-center gap-2">
                <span className="text-[12px] text-[#C3C3C3]">
                  {ingredient.expiryDate}
                </span>

                <span
                  className={`text-[12px] font-semibold ${
                    status.text === "여유 있어요"
                      ? "text-[#1FA43C]"
                      : "text-[#D91F1F]"
                  }`}
                >
                  {status.text}
                </span>
              </div>
            </div>
          </div>

          {/* 정보 / 수정 */}
          {!isEditing ? (
            <div className="flex w-full flex-col items-center gap-5">
              {/* 메모 */}
              <div className="flex w-full items-center rounded-md bg-white px-3 py-3 shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)]">
                <span className="flex-1 truncate text-[14px] font-medium text-[#C3C3C3]">
                  {ingredient.memo ?? "메모를 입력해주세요"}
                </span>

                <button onClick={() => setIsEditing(true)}>
                  <img src={memoIcon} alt="메모 수정" className="w-6 h-6" />
                </button>
              </div>

              {/* 보관정보 */}
              <div className="flex w-full gap-[3px]">
                <div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-l-md bg-[#EBEBEB] py-2">
                  <span className="text-[12px] font-semibold text-[#202020]">
                    보관장소
                  </span>
                  <img
                    src={storageIconMap[location]}
                    alt={location}
                    className="w-5 h-5 brightness-0"
                  />
                </div>

                <div className="flex flex-1 flex-col items-center justify-center gap-1 bg-[#EBEBEB] py-2">
                  <span className="text-[12px] font-semibold text-[#202020]">
                    유통기한
                  </span>
                  <span className="text-[12px]">{ingredient.expiryDate}</span>
                </div>

                <div className="flex flex-1 flex-col items-center justify-center gap-1 rounded-r-md bg-[#EBEBEB] py-2">
                  <span className="text-[12px] font-semibold text-[#202020]">
                    수량
                  </span>
                  <span className="text-[12px]">
                    {ingredient.quantity}
                    {ingredient.unit}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <select
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value as Ingredient["category"])
                }
                className="rounded-lg border p-2"
              >
                <option value="냉장">냉장</option>
                <option value="냉동">냉동</option>
                <option value="상온">상온</option>
              </select>

              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="rounded-lg border p-2"
              />

              <div className="flex gap-2">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="flex-1 rounded-lg border p-2"
                />
                <select
                  value={unit}
                  onChange={(e) =>
                    setUnit(e.target.value as Ingredient["unit"])
                  }
                >
                  <option value="개">개</option>
                  <option value="묶음">묶음</option>
                  <option value="봉지">봉지</option>
                  <option value="팩">팩</option>
                  <option value="캔">캔</option>
                  <option value="병">병</option>
                </select>
              </div>

              <textarea
                placeholder="메모를 입력하세요"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                className="rounded-lg border p-2"
              />
            </div>
          )}

          {/* 등록일 */}
          <div className="flex w-full flex-col items-end gap-1">
            <span className="text-[10px] font-semibold text-[#C3C3C3]">
              등록일 · {new Date(ingredient.createdAt).toLocaleDateString()}
            </span>

            <div className="w-full h-[0.5px] bg-[#C3C3C3]" />
          </div>

          {/* TIP */}
          {tip && (
            <div className="flex w-full flex-col items-center gap-4">
              {/* 캐릭터 + 말풍선 */}
              <div className="flex items-end justify-center gap-1">
                {/* 캐릭터 */}
                <img
                  src={character}
                  alt="tip character"
                  className="w-[64px] h-[56px]"
                />

                {/* 말풍선 */}
                <div className="flex w-[178px] h-[96px] items-center justify-center">
                  <div
                    className="
            flex w-[162px]
            flex-col items-start gap-[6px]
            rounded-[4.8px]
            border border-[#D1D1D1]
            bg-white
            px-[17.6px] py-[9.4px]
          "
                  >
                    <span className="text-[8px] font-semibold leading-[12px] text-[#32E389]">
                      TIP
                    </span>

                    <p className="text-[10px] font-medium leading-[13px] text-[#202020]">
                      {tip}
                    </p>
                  </div>
                </div>
              </div>

              {/* 안내 문구 */}
              <div className="flex flex-col items-center gap-1">
                <p className="text-center text-[10px] leading-[14px] text-[#C3C3C3]">
                  AI가 제공하는 정보에는 실수가 있을 수 있습니다
                  <br />
                  관련 정보를 확인 후 활용해주세요
                </p>
              </div>
            </div>
          )}

          {/* 저장 버튼 */}
          {isEditing && (
            <button
              className="mt-2 rounded-xl bg-black py-3 text-white"
              onClick={() => {
                updateIngredient({
                  ...ingredient,
                  category: location,
                  memo,
                  quantity: Number(quantity),
                  unit,
                  expiryDate,
                  dDay: calcDDay(expiryDate), // 이게 핵심
                });

                onClose();
              }}
            >
              저장
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
