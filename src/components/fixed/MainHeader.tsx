// src/components/auth/AuthHeader.tsx
import { mainLogo } from "../../assets";
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
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="mx-auto max-w-[450px] pointer-events-auto">
        <div className="h-[48px] flex items-start justify-between pb-1">
          <div className="flex-1 flex p-1">
            <img
              src={mainLogo}
              alt="CooKeep logo"
              className="w-25 object-contain pb-1 ml-[31px] mt-1"
            />
          </div>

          <div className="w-10 h-10 flex items-center justify-end mr-[9px]">
            <button className="p-1" onClick={handleSettings}>
              <img src={settings} alt="settings" className="w-9" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
