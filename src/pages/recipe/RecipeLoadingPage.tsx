import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LoadingIcon from "../../assets/recipe/main/LoadingIcon.svg";
import CheckIcon from "../../assets/signup/check.svg";
import StepMessage from "../../components/recipe/main/loading/StepMessage";
import { useRecipeFlowStore } from "../../stores/useRecipeFlowStore";
// import RecipeLoadingSpinner from "../../components/recipe/main/loading/RecipeLoadingSpinner";

export default function RecipeLoadingPage() {
  const navigate = useNavigate();
  const _selectedIngredients = useRecipeFlowStore(
    (state) => state.selectedIngredients,
  );
  const _difficulty = useRecipeFlowStore((state) => state.difficulty);

  const [step, setStep] = useState(0);

  const messages = [
    "선택한 재료를 보고 있어요...",
    "원하는 난이도에 맞추는 중이에요...",
    "맞춤형 레시피가 완성됐어요!",
  ];

  useEffect(() => {
    if (step < messages.length) {
      const timer = setTimeout(() => setStep(step + 1), 2000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => navigate("/recipe/result"), 1000);
      return () => clearTimeout(timer);
    }
  }, [step, navigate, messages.length]);

  return (
    <div className="flex flex-col items-center h-screen pt-[193px] text-center">
      {/* 로딩 아이콘 */}
      <img
        src={LoadingIcon}
        className="w-20 h-20 animate-spin mb-10"
        alt="loading"
      />
      {/* <RecipeLoadingSpinner /> */}

      {/* 타이틀 / 서브타이틀 */}
      <div className="flex flex-col items-center w-[361px] gap-2 mb-[49px]">
        <h1 className="typo-result-title">오늘의 요리 준비 중...</h1>
        <p className="typo-button text-[#1FC16F] font-bold">
          나에게 딱 맞는 레시피를 찾고 있어요
        </p>
      </div>

      {/* 메시지 카드 */}
      <div className="flex flex-col w-[321px] gap-3">
        {messages.slice(0, step).map((msg, idx) => (
          <StepMessage key={idx} message={msg} index={idx} icon={CheckIcon} />
        ))}
      </div>
    </div>
  );
}
