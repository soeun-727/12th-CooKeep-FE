// src/pages/settings/components/PhoneVerifySection.tsx
import React, { useState, useEffect } from "react";
import TextField from "../../ui/TextField";
import Button from "../../ui/Button";
import PhoneAuthModal from "../../auth/signup/PhoneAuthModal";
import { useSignupStore } from "../../../stores/useSignupStore";

type ModalType = "send" | "verify" | "help";

interface PhoneVerifySectionProps {
  onSuccess: () => void;
}

export default function PhoneVerifySection({
  onSuccess,
}: PhoneVerifySectionProps) {
  const { phone, setPhone, isCodeSent, sendCode, verifyCode } =
    useSignupStore();

  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string>();
  const [timeLeft, setTimeLeft] = useState(180);
  const [timerActive, setTimerActive] = useState(false);
  const [modalType, setModalType] = useState<ModalType | null>(null);

  const isPhoneValid = /^01[0-9]{9}$/.test(phone.replace(/-/g, ""));

  /* =====================
     타이머
  ====================== */
  useEffect(() => {
    if (!timerActive) return;

    const timer = setTimeout(() => {
      if (timeLeft <= 1) {
        setTimerActive(false);
        setTimeLeft(0);
        setCodeError("인증번호가 만료되었습니다");
      } else {
        setTimeLeft((prev) => prev - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, timerActive]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  /* =====================
     인증번호 발송 / 재발송
  ====================== */
  const handleSendCode = () => {
    setCode("");
    setCodeError(undefined);

    setTimeLeft(180);
    setTimerActive(true);

    sendCode(); // Zustand store API 호출
    setModalType("send");
  };

  const handleResend = handleSendCode;

  /* =====================
     인증 확인
  ====================== */
  const handleVerify = async () => {
    if (timeLeft === 0) {
      setCodeError("인증번호가 만료되었습니다");
      return;
    }

    if (code.length !== 6) {
      setCodeError("인증번호를 다시 입력해 주세요");
      return;
    }

    const success = await verifyCode(code);

    if (success) {
      setCodeError(undefined);
      setModalType("verify"); // 모달 띄우기
    } else {
      setCodeError("인증번호를 다시 입력해 주세요");
    }
  };

  return (
    <div className="pt-[241px] w-[361px] mx-auto">
      <div className="typo-h1">휴대폰 번호 변경</div>

      {/* 전화번호 입력 */}
      <div className="relative mt-[12px]">
        <TextField
          value={phone}
          onChange={setPhone}
          placeholder="새 휴대폰 번호(- 없이 숫자만 입력)"
          errorMessage={
            !isPhoneValid && phone
              ? "휴대폰 번호를 다시 확인해주세요"
              : undefined
          }
          rightIcon={
            <button
              type="button"
              onClick={isCodeSent ? handleResend : handleSendCode}
              disabled={!isPhoneValid}
              className={`
                w-[102px] h-[24px] rounded-full typo-caption text-white
                ${
                  isPhoneValid
                    ? "bg-[#202020] border-[#202020]"
                    : "bg-[#C3C3C3] border-[#C3C3C3]"
                }
              `}
            >
              {isCodeSent ? "인증번호 재발송" : "인증번호 발송"}
            </button>
          }
        />
      </div>

      {/* 인증번호 입력 */}
      <div className="mt-[5px]">
        <TextField
          value={code}
          onChange={(value) => {
            const onlyNumber = value.replace(/[^0-9]/g, "");
            setCode(onlyNumber);

            if (!onlyNumber) {
              setCodeError(undefined);
            } else if (onlyNumber.length !== 6) {
              setCodeError("인증번호를 다시 입력해 주세요");
            } else {
              setCodeError(undefined);
            }
          }}
          placeholder="인증번호 입력"
          disabled={!isCodeSent || modalType === "send"} // 🔹 발송 후 바로 입력 불가 + 회색 처리
          errorMessage={codeError}
        />
      </div>

      {/* 인증 확인 버튼 */}
      <Button
        size="S"
        className="mt-[31px]"
        disabled={!isCodeSent || code.length !== 6 || timeLeft === 0}
        onClick={handleVerify}
      >
        인증하기 {isCodeSent && `(${formatTime(timeLeft)})`}
      </Button>

      {/* 도움말 버튼 */}
      <button
        type="button"
        onClick={() => setModalType("help")}
        className="
          mt-6
          w-[361px]
          typo-caption
          text-[#7D7D7D]
          text-center
          underline
          cursor-pointer
          bg-transparent
        "
      >
        인증 번호가 발송되지 않나요?
      </button>

      {/* 모달 */}
      {modalType && (
        <PhoneAuthModal
          type={modalType}
          phone={phone}
          onConfirm={() => {
            if (modalType === "verify") {
              onSuccess(); // 부모(EditPhonePage)에게 성공 알림
            }
            setModalType(null);
          }}
        />
      )}
    </div>
  );
}
