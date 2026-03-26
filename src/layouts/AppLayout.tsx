import { useLocation } from "react-router-dom";
import { useThemeColor } from "../hooks/useThemeColor";

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
      </div>
    </div>
  );
}
