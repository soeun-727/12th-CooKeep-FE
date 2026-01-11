import React from "react";
import CautionIcon from "../../../assets/signup/icon_caution.svg";
import Button from "../../ui/Button";

export type PhoneAuthModalType = "send" | "verify" | "already" | "help";

interface PhoneAuthModalProps {
  type: PhoneAuthModalType;
  phone?: string;
  onConfirm: () => void;
  onLogin?: () => void;
}

const PhoneAuthModal = ({
  type,
  phone,
  onConfirm,
  onLogin,
}: PhoneAuthModalProps) => {
  const isSend = type === "send";
  const isVerify = type === "verify";
  const isAlready = type === "already";
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
      {/* 인증번호 발송 안됨 아이콘 */}
      {isHelp && (
        <img src={CautionIcon} alt="주의" className="mb-2 w-[20px] h-[20px]" />
      )}
      {/* 메인 메시지 */}
      <p className="text-[14px] font-medium text-center leading-[20px] text-[#111111]">
        {isSend && "인증번호가 발송되었습니다."}
        {isVerify && "인증이 완료되었습니다!"}
        {isAlready && "이미 가입된 계정이 있어요"}
        {isHelp &&
          "통신 환경에 따라 발송이 지연되거나 차단될 수 있어요. 문제가 지속되면 아래 고객센터로 문의해 주세요."}
      </p>

      {/* 부가 텍스트 */}
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

      {/* 버튼 */}
      <Button
        size="S"
        onClick={isAlready ? onLogin : onConfirm}
        className={`
    !h-[38px]
    ${isHelp ? "!w-[200px] !bg-[#202020]" : "!w-[184px] !bg-[#1FC16F]"}
  `}
      >
        {isHelp ? "닫기" : isAlready ? "로그인하기" : "확인"}
      </Button>
    </div>
  );
};

export default PhoneAuthModal;
