import { useLocation } from "react-router-dom";
import { useThemeColor } from "../hooks/useThemeColor";
import { useLoadingStore } from "../stores/useLoadingStore";
import LoadingScreen from "../components/ui/LoadingScreen";

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
  return (
    <div className="min-h-[100dvh] flex justify-center">
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
      </div>
    </div>
  );
}
