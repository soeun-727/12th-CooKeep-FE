import React from "react";
import CautionIcon from "../../../assets/signup/icon_caution.svg";
import Button from "../../ui/Button";

export type FindPhoneAuthModalType =
  | "send"
  | "verify"
  | "notRegistered"
  | "help";

interface FindPhoneAuthModalProps {
  type: FindPhoneAuthModalType;
  phone?: string;
  onConfirm: () => void;
  onSignup?: () => void;
}

const FindPhoneAuthModal = ({
  type,
  phone,
  onConfirm,
  onSignup,
}: FindPhoneAuthModalProps) => {
  const isSend = type === "send";
  const isVerify = type === "verify";
  const isNotRegistered = type === "notRegistered";
  const isHelp = type === "help";

  return (
    <div
      className="fixed z-50 left-1/2 -translate-x-1/2 bg-white rounded-[10px]"
      style={{
        top: isHelp ? 308 : isSend ? 359 : 343,
        width: isHelp ? 256 : 240,
        minHeight: isHelp ? 236 : isSend ? 134 : 166,
        paddingTop: 35,
        paddingRight: 28,
        paddingBottom: 25,
        paddingLeft: 28,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
      {isHelp && (
        <img src={CautionIcon} alt="주의" className="mb-2 w-[20px] h-[20px]" />
      )}

      <p className="text-[14px] font-medium text-center leading-[20px] text-[#111111]">
        {isSend && "인증번호가 발송되었습니다."}
        {isVerify && "인증에 성공하셨습니다."}
        {isNotRegistered &&
          "해당 번호로 가입된 계정을 찾을 수 없어요 회원가입을 먼저 진행해 주세요"}
        {isHelp &&
          "통신 환경에 따라 발송이 지연되거나 차단될 수 있어요. 문제가 지속되면 아래 고객센터로 문의해 주세요."}
      </p>

      {isVerify && phone && (
        <p className="text-[12px] text-[#7D7D7D] text-center">
          {phone.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2")}
        </p>
      )}

      {isHelp && (
        <p className="text-[12px] text-[#7D7D7D] text-center">
          cookeep2026@gmail.com
        </p>
      )}

      <Button
        size="S"
        onClick={isNotRegistered ? onSignup : onConfirm}
        className={`!h-[38px] ${
          isHelp ? "!w-[200px] !bg-[#202020]" : "!w-[184px] !bg-[#1FC16F]"
        }`}
      >
        {isHelp ? "닫기" : isNotRegistered ? "회원가입하기" : "확인"}
      </Button>
    </div>
  );
};

export default FindPhoneAuthModal;
