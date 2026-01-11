// src/components/auth/AuthHeader.tsx
import Logo from "../../assets/fixed/Logo.svg";
import settings from "../../assets/fixed/settings.svg";

const MainHeader = () => {
  return (
    <header
      className="
        fixed top-0 z-50
        left-1/2 -translate-x-1/2
        w-full max-w-[450px]
        h-[102px] 
        bg-[#E8ECF6]
        px-4
      "
    >
      <div className="relative w-full h-full">
        <img
          src={Logo}
          alt="CooKeep logo"
          className="
            absolute left-1/2 -translate-x-1/2
            top-[62px] 
            w-[70px] h-6
          "
        />
        <button
          className="absolute right-0 top-[54px]"
          onClick={() => console.log("Settings clicked")}
        >
          <img src={settings} alt="settings" className="w-9 h-9" />
        </button>
      </div>
    </header>
  );
};

export default MainHeader;
