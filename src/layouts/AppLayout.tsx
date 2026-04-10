import { useLocation } from "react-router-dom";
import { useThemeColor } from "../hooks/useThemeColor";
import { useLoadingStore } from "../stores/useLoadingStore";
import LoadingScreen from "../components/ui/LoadingScreen";
import WeeklyGoalModal from "../components/ui/WeeklyGoalModal"; // 추가
import ExpiringRewardModal from "../components/recipe/ExpiringRewardModal";
import { useRewardStore } from "../stores/useRewardStore";
import OnboardingIngredientModal from "../components/fridge/modals/OnboardingIngredientModal";

type Props = {
  children: React.ReactNode;
};

const getThemeColorByPath = (pathname: string) => {
  if (pathname.startsWith("/fridge")) return "#FAFAFA";
  if (pathname.startsWith("/recipe")) return "#FAFAFA";
  if (pathname === "/cookeeps") return "#D1FBFA";
  if (pathname === "/mycookeep") return "#31E087";
  return "#FAFAFA";
};

// AppLayout.tsx
export default function AppLayout({ children }: Props) {
  const { pathname } = useLocation();
  const themeColor = getThemeColorByPath(pathname);
  useThemeColor(themeColor);
  const isLoading = useLoadingStore((s) => s.isLoading);

  // 추가
  // const { isModalOpen, hideWeeklyGoalModal } = useWeeklyGoalStore();

  //  const { showExpiring, closeExpiring } = useRewardStore();
  const { current, dequeue } = useRewardStore();

  return (
    <div className="min-h-[100dvh] flex justify-center bg-[#FAFAFA]">
      <div
        style={{ backgroundColor: themeColor }}
        className="
          relative
          w-full
          max-w-[450px]
          min-h-full
          flex flex-col
          transition-colors duration-300
        "
      >
        {children}

        {/* overlay 방식으로 변경 */}
        {isLoading && (
          <div className="absolute inset-0 z-50 bg-white">
            <LoadingScreen />
          </div>
        )}
        {/* 추가 - z-index를 LoadingScreen(50)보다 높게 */}
        {current === "WEEKLY" && (
          <WeeklyGoalModal isOpen={true} onClose={dequeue} />
        )}
        {current === "ONBOARDING_INGREDIENT" && (
          <OnboardingIngredientModal isOpen={true} onClose={dequeue} />
        )}

        {current === "EXPIRING" && <ExpiringRewardModal onConfirm={dequeue} />}
      </div>
    </div>
  );
}
