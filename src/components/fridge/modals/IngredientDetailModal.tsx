import { useEffect, useState } from "react";
import {
  useIngredientStore,
  type Ingredient,
} from "../../../stores/useIngredientStore";
import character from "../../../assets/character/tip_char.svg";
import memoIcon from "../../../assets/fridge/edit_memo.svg";
import fridgeIcon from "../../../assets/fridge/fridge.svg";
import freezerIcon from "../../../assets/fridge/freezer.svg";
import pantryIcon from "../../../assets/fridge/pantry.svg";
import bubbleTail from "../../../assets/fridge/bubble_tail_left.svg";
import EditModal from "../../ui/EditModal";
import StorageEditor from "../addItems/components/edit/StorageEditor";
import ExpiryEditor from "../addItems/components/edit/ExpiryEditor";
import QuantityEditor from "../addItems/components/edit/QuantityEditor";
import { getIngredientDetail } from "../../../api/ingredient";
import { getKoreanStorage, getKoreanUnit } from "../../../utils/mapping";

interface Props {
  ingredient: Ingredient;
  onClose: () => void;
  onUpdate: () => void;
}

export default function IngredientDetailModal({
  ingredient,
  onClose,
  onUpdate,
}: Props) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [memo, setMemo] = useState("");
  const [openEditor, setOpenEditor] = useState<
    null | "storage" | "expiry" | "quantity"
  >(null);
  const [isDirty, setIsDirty] = useState(false);

  const { changeStorage, changeExpiryDate, changeQuantity, changeMemo } =
    useIngredientStore();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const fetchDetail = async () => {
      try {
        setIsLoading(true);
        const response = await getIngredientDetail(Number(ingredient.id));
        if (response.data && response.data.data) {
          const data = response.data.data;
          setMemo(data.memo || "");
        }
      } catch (error) {
        console.error("상세 정보 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetail();
    return () => {
      document.body.style.overflow = "";
    };
  }, [ingredient.id]);

  const storageIconMap = {
    냉장: fridgeIcon,
    냉동: freezerIcon,
    상온: pantryIcon,
  };

  const handleSaveMemo = async () => {
    try {
      await changeMemo(ingredient.id, memo);
      setIsEditing(false);
      setIsDirty(true); // 👈 깃발만 올림
    } catch (error) {
      console.error("메모 저장 실패:", error);
    }
  };

  if (isLoading)
    return (
      <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40">
        <div className="bg-white p-6 rounded-lg text-sm">정보 로딩 중...</div>
      </div>
    );

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* modal box */}
      <div
        className="
          relative z-10
          w-full max-w-[330px]
          max-h-[90vh] overflow-y-auto no-scrollbar
          rounded-[6px]
          px-5 py-6
          bg-gradient-to-b from-[#F5F5F5] to-white
          shadow-[0_1px_8.2px_-2px_rgba(17,17,17,0.25)]
          animate-fadeIn
        "
      >
        <div className="flex w-full max-w-[290px] flex-col items-center gap-5 mx-auto">
          {/* 헤더 */}
          <div className="flex flex-col items-center gap-2 self-stretch">
            <span className="text-[16px] font-semibold leading-6 text-[#202020] text-center">
              상세정보
            </span>
            <div className="w-full h-[0.5px] bg-[#C3C3C3]" />
          </div>

          {/* 내용 섹션 */}
          <div className="flex flex-col items-center gap-4 self-stretch">
            <div className="flex w-full items-center gap-[14px]">
              {/* 이미지 영역 (100px 원형 배경) */}
              <div className="flex h-[86px] w-[86px] items-center justify-center rounded-[10px] bg-[#E6FBEB] flex-shrink-0">
                <img
                  src={ingredient.image}
                  alt={ingredient.name}
                  className="h-[60px] w-[60px] rounded-[6px] object-cover aspect-square"
                />
              </div>

              {/* 텍스트 영역 */}
              <div className="flex flex-1 flex-col items-start gap-1">
                <span className="w-full truncate text-[16px] font-semibold leading-5 text-[#202020]">
                  {ingredient.name}
                </span>

                <div className="flex flex-col items-start gap-2">
                  <span className="text-[12px] text-[#C3C3C3] leading-4">
                    D-{ingredient.dDay}
                  </span>
                  <span
                    className={`text-[12px] font-semibold leading-4 ${
                      ingredient.dDay > 3 ? "text-[#1FA43C]" : "text-[#D91F1F]"
                    }`}
                  >
                    {ingredient.dDay > 3
                      ? "유통기한이 넉넉해요"
                      : "유통기한이 얼마 남지 않았어요"}
                  </span>
                </div>
              </div>
            </div>

            {/* 정보 수정 및 보관 데이터 */}
            <div className="flex flex-col items-start gap-[14px] self-stretch">
              {/* 메모 입력창 */}
              <div className="flex w-full items-center rounded-[6px] bg-white px-3 py-3 shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)] gap-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={memo}
                    autoFocus
                    onChange={(e) => setMemo(e.target.value)}
                    onBlur={handleSaveMemo}
                    onKeyDown={(e) => e.key === "Enter" && handleSaveMemo()}
                    className="flex-1 text-[14px] font-medium text-[#202020] border-b border-[#C3C3C3] focus:outline-none"
                  />
                ) : (
                  <span
                    className={`flex-1 truncate text-[14px] font-medium leading-5 ${
                      memo ? "text-[#202020]" : "text-[#C3C3C3]"
                    }`}
                  >
                    {memo || "메모를 입력해주세요"}
                  </span>
                )}
                <button onClick={() => setIsEditing(true)}>
                  <img
                    src={memoIcon}
                    alt="수정"
                    className="w-6 h-6 aspect-square"
                  />
                </button>
              </div>

              {/* 3단 정보 (보관장소, 유통기한, 수량) */}
              <div className="flex flex-col items-start gap-[6px] self-stretch">
                <div className="flex h-14 w-full gap-[3px] items-center">
                  <div
                    className="flex-1 h-full flex flex-col justify-center items-center bg-[#EBEBEB] py-[5px] rounded-l-[6px] cursor-pointer"
                    onClick={() => setOpenEditor("storage")}
                  >
                    <span className="text-[12px] font-semibold text-[#202020] leading-4 truncate self-stretch text-center">
                      보관장소
                    </span>
                    <img
                      src={
                        storageIconMap[
                          ingredient.category as keyof typeof storageIconMap
                        ]
                      }
                      className="w-5 h-5 brightness-0"
                    />
                  </div>

                  <div
                    className="flex-1 h-full flex flex-col justify-center items-center bg-[#EBEBEB] py-[5px] cursor-pointer"
                    onClick={() => setOpenEditor("expiry")}
                  >
                    <span className="text-[12px] font-semibold text-[#202020] leading-4 truncate self-stretch text-center">
                      유통기한
                    </span>
                    <span className="text-[12px] leading-4 text-[#202020]">
                      {ingredient.expiryDate}
                    </span>
                  </div>

                  <div
                    className="flex-1 h-full flex flex-col justify-center items-center bg-[#EBEBEB] py-[5px] rounded-r-[6px] cursor-pointer"
                    onClick={() => setOpenEditor("quantity")}
                  >
                    <span className="text-[12px] font-semibold text-[#202020] leading-4 truncate self-stretch text-center">
                      수량/단위
                    </span>
                    <span className="text-[12px] leading-4 text-[#202020]">
                      {ingredient.quantity}
                      {getKoreanUnit(ingredient.unit)}
                    </span>
                  </div>
                </div>

                {/* 등록일자 및 구분선 */}
                <div className="flex flex-col items-end gap-1 self-stretch">
                  <div className="flex justify-end items-end gap-1">
                    <span className="text-[10px] font-semibold text-[#C3C3C3] leading-4">
                      등록일자{" "}
                      {ingredient.createdAt &&
                      !isNaN(new Date(ingredient.createdAt).getTime())
                        ? new Date(ingredient.createdAt).toLocaleDateString()
                        : "정보 없음"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* TIP 캐릭터 및 말풍선 */}
            {ingredient.tip && (
              <div className="flex flex-col items-center gap-5 self-stretch mt-1">
                {/* 컨테이너: items-end를 유지하여 캐릭터와 말풍선 바닥 라인을 맞춤 */}
                <div className="flex items-end justify-center gap-5 w-full relative">
                  {/* 캐릭터 */}
                  <img
                    src={character}
                    alt="tip character"
                    className="w-[64px] h-[56px] flex-shrink-0 relative z-30"
                  />

                  <div className="relative flex-1 max-w-[178px]">
                    <img
                      src={bubbleTail}
                      alt=""
                      className="absolute left-[-14px] bottom-[12px] w-[27.2px] z-20"
                    />
                    <div
                      className="
            relative z-10
            flex w-full
            flex-col items-start gap-[3.2px]
            rounded-[4.8px]
            border-[0.8px] border-[#D1D1D1]
            bg-white
            px-[17.6px] py-[10px]
            min-h-[56px]
            shadow-sm
          "
                    >
                      <span className="text-[8px] font-semibold leading-[12px] text-[#32E389] self-stretch">
                        TIP
                      </span>
                      <p className="text-[10px] font-medium leading-[14px] text-[#202020] self-stretch break-words">
                        {ingredient.tip}
                      </p>
                    </div>
                  </div>
                </div>

                {/* AI 안내 문구 */}
                <div className="flex flex-col items-center gap-1 self-stretch">
                  <p className="text-center text-[10px] font-normal leading-[14px] text-[#C3C3C3]">
                    AI가 제공하는 정보에는 실수가 있을 수 있습니다
                    <br />
                    관련 정보를 확인 후 활용해주세요
                  </p>
                </div>
              </div>
            )}

            {/* ===== 보관장소 수정 ===== */}
            <EditModal
              isOpen={openEditor === "storage"}
              onClose={() => setOpenEditor(null)}
              title="보관장소 수정"
            >
              <StorageEditor
                value={ingredient.category}
                onSave={async (val) => {
                  await changeStorage(ingredient.id, val);
                  setIsDirty(true);
                  setOpenEditor(null);
                }}
              />
            </EditModal>

            {/* ===== 유통기한 수정 ===== */}
            <EditModal
              isOpen={openEditor === "expiry"}
              onClose={() => setOpenEditor(null)}
              title="유통기한 수정"
            >
              <ExpiryEditor
                value={ingredient.expiryDate}
                onSave={async (val) => {
                  await changeExpiryDate(ingredient.id, val);
                  setIsDirty(true);
                  setOpenEditor(null);
                }}
              />
            </EditModal>

            {/* ===== 수량 수정 ===== */}
            <EditModal
              isOpen={openEditor === "quantity"}
              onClose={() => setOpenEditor(null)}
              title="수량 수정"
            >
              <QuantityEditor
                value={ingredient.quantity}
                onSave={async (val) => {
                  await changeQuantity(ingredient.id, Number(val));
                  setIsDirty(true);
                  setOpenEditor(null);
                }}
              />
            </EditModal>
          </div>
        </div>
      </div>
    </div>
  );
}
