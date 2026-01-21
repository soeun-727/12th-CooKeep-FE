import { useEffect, useState } from "react";
import type { Ingredient } from "../../../stores/useIngredientStore";
import character from "../../../assets/character/tip_char.svg";
import memoIcon from "../../../assets/fridge/memo.svg";
import fridgeIcon from "../../../assets/fridge/fridge.svg";
import freezerIcon from "../../../assets/fridge/freezer.svg";
import pantryIcon from "../../../assets/fridge/pantry.svg";

// DetailModal 내부 혹은 파일 상단에 추가
function PlaceholderModal({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-md w-[280px] flex flex-col items-center gap-4">
        <p className="text-center">{title} 모달이 아직 구현되지 않았습니다.</p>
        <button
          onClick={onClose}
          className="mt-2 bg-black text-white px-4 py-2 rounded"
        >
          닫기
        </button>
      </div>
    </div>
  );
}

interface Props {
  ingredient: Ingredient;
  onClose: () => void;
  onUpdate: (updated: Partial<Ingredient>) => void; // 추가
}

export default function IngredientDetailModal({
  ingredient,
  onClose,
  onUpdate,
}: Props) {
  // 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const [isEditing, setIsEditing] = useState(false);
  const [isMemoOpen, setIsMemoOpen] = useState(false);
  const [memo, setMemo] = useState(ingredient.memo ?? "");

  const handleSave = () => {
    setIsEditing(false);
    onUpdate({ memo }); // 상위 콜백으로 저장
  };

  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isExpiryOpen, setIsExpiryOpen] = useState(false);
  const [isQuantityOpen, setIsQuantityOpen] = useState(false);

  const getExpiryStatus = (dDay: number) => {
    if (dDay <= 3) {
      return {
        text: "유통기한이 얼마 남지 않았어요",
      };
    }
    return {
      text: "유통기한이 넉넉해요",
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
    <div className="fixed inset-0 z-60 flex items-center justify-center">
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
          <div className="flex flex-col items-center gap-2 w-full">
            <span className="text-[16px] font-semibold leading-6 text-[#202020]">
              상세정보
            </span>

            <div className="w-full h-[0.5px] bg-[#C3C3C3]" />
          </div>

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
                  D-{ingredient.dDay}
                </span>

                <span
                  className={`text-[12px] font-semibold ${
                    status.text === "유통기한이 넉넉해요"
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
          {/* 메모 */}
          <div className="flex w-full items-center rounded-md bg-white px-3 py-3 shadow">
            {isEditing ? (
              <input
                type="text"
                value={memo}
                autoFocus
                onChange={(e) => setMemo(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSave();
                  }
                }}
                className="flex-1 text-[14px] font-medium text-[#202020] border-b border-[#C3C3C3] focus:outline-none"
              />
            ) : (
              <span
                className={`flex-1 truncate text-[14px] font-medium ${
                  memo ? "text-[#202020]" : "text-[#C3C3C3]"
                }`}
              >
                {memo || "메모를 입력해주세요"}
              </span>
            )}

            <button
              onClick={() => {
                if (isEditing) {
                  handleSave(); // 저장
                } else {
                  setIsEditing(true); // 편집 시작
                }
              }}
            >
              <img src={memoIcon} alt="메모 수정" className="w-6 h-6" />
            </button>
          </div>

          {/* 보관장소, 유통기한, 수량+단위 */}
          <div className="flex w-full gap-[3px] mt-3">
            <button
              className="flex-1 flex flex-col items-center bg-[#EBEBEB] py-2 rounded-l-md"
              onClick={() => setIsLocationOpen(true)}
            >
              <span className="text-[12px] font-semibold text-[#202020]">
                보관장소
              </span>
              <img
                src={storageIconMap[ingredient.category]}
                className="w-5 h-5 brightness-0"
              />
            </button>

            <button
              className="flex-1 flex flex-col items-center bg-[#EBEBEB] py-2"
              onClick={() => setIsExpiryOpen(true)}
            >
              <span className="text-[12px] font-semibold text-[#202020]">
                유통기한
              </span>
              <span className="text-[12px]">{ingredient.expiryDate}</span>
            </button>

            <button
              className="flex-1 flex flex-col items-center bg-[#EBEBEB] py-2 rounded-r-md"
              onClick={() => setIsQuantityOpen(true)}
            >
              <span className="text-[12px] font-semibold text-[#202020]">
                수량/단위
              </span>
              <span className="text-[12px]">
                {ingredient.quantity}
                {ingredient.unit}
              </span>
            </button>
          </div>

          {/* 등록일 */}
          <div className="flex w-full flex-col items-end gap-1">
            <span className="text-[10px] font-semibold text-[#C3C3C3]">
              등록일자 {new Date(ingredient.createdAt).toLocaleDateString()}
            </span>
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

          {isMemoOpen && (
            <PlaceholderModal
              title="메모"
              onClose={() => setIsMemoOpen(false)}
            />
          )}

          {isLocationOpen && (
            <PlaceholderModal
              title="보관장소"
              onClose={() => setIsLocationOpen(false)}
            />
          )}

          {isExpiryOpen && (
            <PlaceholderModal
              title="유통기한"
              onClose={() => setIsExpiryOpen(false)}
            />
          )}

          {isQuantityOpen && (
            <PlaceholderModal
              title="수량/단위"
              onClose={() => setIsQuantityOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
