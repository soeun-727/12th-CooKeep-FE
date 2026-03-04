import { useLocation } from "react-router-dom";
import { useThemeColor } from "../hooks/useThemeColor";

type Props = {
  children: React.ReactNode;
};

const getThemeColorByPath = (pathname: string) => {
  if (pathname.startsWith("/fridge")) return "#FAFAFA";
  if (pathname.startsWith("/recipe")) return "#FFFFFF";
  if (pathname.startsWith("/cookeeps")) return "#D1FBFA";
  if (pathname.startsWith("/mycookeep")) return "#31E087";
  return "#FAFAFA";
};

// AppLayout.tsx
export default function AppLayout({ children }: Props) {
  const { pathname } = useLocation();
  const themeColor = getThemeColorByPath(pathname);
  useThemeColor(themeColor);
  return (
    <div className="min-h-[100dvh] bg-gray-100 flex justify-center">
      <div
        className="
          relative
          w-full
          max-w-[450px]
          bg-[#FAFAFA]
          min-h-full
          flex flex-col
        "
      >
        {children}
      </div>
    </div>
  );
}
