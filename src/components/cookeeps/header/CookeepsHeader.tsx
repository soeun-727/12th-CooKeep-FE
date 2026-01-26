import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlantShortcutTooltip from "./PlantShortcutTooltip";
import settings from "../../../assets/cookeeps/main/settings_cookeeps.svg";
import Logo from "../../../assets/cookeeps/main/logo_cookeeps_black.svg";
import cookieIcon from "../../../assets/cookeeps/main/cookeeps_cookie.svg";
import bookIcon from "../../../assets/cookeeps/main/cookeeps_book.svg";

export default function CookeepsHeader() {
  const navigate = useNavigate();

  const TOOLTIP_KEY = "cookeepsPlantShortcutSeen";

  const [showTooltip, setShowTooltip] = useState(() => {
    return !localStorage.getItem(TOOLTIP_KEY);
  });

  useEffect(() => {
    if (!showTooltip) return;

    const timer = setTimeout(() => {
      setShowTooltip(false);
      localStorage.setItem(TOOLTIP_KEY, "true");
    }, 5000);

    return () => clearTimeout(timer);
  }, [showTooltip]);

  const handleMyPlantClick = () => {
    setShowTooltip(false);
    localStorage.setItem(TOOLTIP_KEY, "true");
    // navigate("/my-plant") 같은 이동 있으면 여기서 추가
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-10 flex h-14 items-center justify-between px-4">
      {/* 왼쪽 */}
      <div className="flex-1 px-[31px]">
        <img
          src={Logo}
          alt="CooKeep logo"
          className="w-20 object-contain pb-1"
        />
      </div>

      {/* 오른쪽 */}
      <div className="flex items-center gap-2">
        {/* 쿠키 */}
        <button className="flex h-[28px] items-center gap-1 rounded-full bg-[#202020] px-3 py-[2px] text-white shadow">
          <img src={cookieIcon} alt="cookie" className="h-4 w-4" />
          <span className="text-[12px] font-medium leading-4">0 개</span>
        </button>

        {/* 내 식물 + 툴팁 */}
        <div className="relative">
          <button
            onClick={handleMyPlantClick}
            className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#202020]"
          >
            <img src={bookIcon} alt="my plant" className="h-4 w-4" />
          </button>

          <PlantShortcutTooltip visible={showTooltip} />
        </div>

        {/* 설정 */}
        <button
          onClick={() => navigate("/settings")}
          className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#202020]"
        >
          <img
            src={settings}
            alt="settings"
            className="h-[16px] w-[16px] brightness-0 invert-[92%]"
          />
        </button>
      </div>
    </header>
  );
}
