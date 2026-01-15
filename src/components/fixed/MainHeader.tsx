// src/components/auth/AuthHeader.tsx
import Logo from "../../assets/fixed/Logo.svg";
import settings from "../../assets/fixed/settings.svg";

const MainHeader = () => {
  return (
    <header
      className="
        fixed top-0 z-50
        left-1/2 -translate-x-1/2
        w-[400px] max-w-[450px]
        h-[102px] 
        bg-[#FAFAFA]
        px-4
      "
    >
      <div className="relative w-full h-full flex items-end pb-4">
        <div className="absolute left-1/2 -translate-x-1/2 bottom-5">
          <img
            src={Logo}
            alt="CooKeep logo"
            className="w-[70px] object-contain pb-1"
          />
        </div>
        <div className="w-full flex justify-end items-center h-10">
          <button
            className="p-1"
            onClick={() => console.log("Settings clicked")}
          >
            {/* 나중에는 "회원 정보"로 이동하는 로직 추가 */}
            <img src={settings} alt="settings" className="w-9" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
