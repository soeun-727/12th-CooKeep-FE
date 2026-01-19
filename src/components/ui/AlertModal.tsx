import React from "react";
import icon from "../../assets/temp_simplelogin_icon.svg";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  buttonText?: string;
}

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  buttonText = "확인",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center bg-[#11111180]">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative w-60 h-[271.5px] bg-white rounded-[10px] flex flex-col items-center text-center gap-4">
        <div className="typo-body2 font-medium text-neutral-900 mt-[35px]">
          섭취완료!
          <br />
          오늘도 감사해요 :{")"}
        </div>
        <img src={icon} className="w-[71px]" />
        <button
          onClick={onClose}
          className="w-46 h-11 typo-button text-white bg-[var(--color-green-deep)] rounded-[10px]"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
