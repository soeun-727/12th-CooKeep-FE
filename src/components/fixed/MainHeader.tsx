// src/components/auth/AuthHeader.tsx
import Logo from "../../assets/fixed/Logo.svg";
import settings from "../../assets/fixed/settings.svg";
import backIcon from "../../assets/back.svg";
import { useIngredientStore } from "../../stores/useIngredientStore";
import { useNavigate } from "react-router-dom";

const MainHeader = () => {
  const navigate = useNavigate();
  const { viewCategory, setViewCategory } = useIngredientStore();
  const isListView = !!viewCategory;

  const handleBack = () => {
    setViewCategory(null);
  };
  const handleSettings = () => {
    navigate("/settings");
  };

  return (
    <header
      className="
        absolute top-0 z-50
        w-full max-w-[450px]
        h-[102px] 
        bg-[#FAFAFA]
        px-4
      "
    >
      <div className="relative justify-between w-full h-full flex items-end pb-4">
        <div className="w-10 h-10 flex items-center">
          {isListView && (
            <button
              className="p-1 active:opacity-50 transition-opacity"
              onClick={handleBack}
            >
              <img src={backIcon} alt="back" className="w-9" />
            </button>
          )}
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src={Logo}
            alt="CooKeep logo"
            className="w-20 object-contain pb-1"
          />
        </div>

        <div className="w-10 h-10 flex items-center justify-end">
          <button className="p-1" onClick={handleSettings}>
            <img src={settings} alt="settings" className="w-9" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
