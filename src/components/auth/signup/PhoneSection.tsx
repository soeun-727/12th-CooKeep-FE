import React, { useState, useEffect } from "react";
import Button from "../../ui/Button";
import TextField from "../../ui/TextField";
import PhoneAuthModal from "./PhoneAuthModal";
import { useNavigate } from "react-router-dom";

interface PhoneSectionProps {
  phone: string;
  setPhone: (value: string) => void;
  isCodeSent: boolean;
  isVerified: boolean;
  onSendCode: () => void;
  onVerifyCode: (code: string) => void;
}

export default function PhoneSection({
  phone,
  setPhone,
  isCodeSent,
  isVerified,
  onSendCode,
  onVerifyCode,
}: PhoneSectionProps) {
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string | undefined>();
  const [timeLeft, setTimeLeft] = useState(180);
  const [timerActive, setTimerActive] = useState(false);

  type ModalType = "send" | "verify" | "already" | "help";
  const [modalType, setModalType] = useState<ModalType | null>(null);

  const isPhoneValid = /^01[0-9]{9}$/.test(phone.replace(/-/g, ""));

  const navigate = useNavigate();

  // 타이머
  useEffect(() => {
    if (!timerActive) return;

    const timer = setTimeout(() => {
      if (timeLeft <= 1) {
        setTimerActive(false);
        setTimeLeft(0);
        setCodeError("인증번호가 만료되었습니다");
      } else {
        setTimeLeft(timeLeft - 1);
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

  const handleSendCode = () => {
    const alreadySignedUp = false;

    if (alreadySignedUp) {
      setModalType("already");
      return;
    }

    // 🔥 기존 인증 완전 무효화
    setCode("");
    setCodeError(undefined);

    // 🔥 타이머 리셋
    setTimeLeft(180);
    setTimerActive(false);
    setTimerActive(true);

    onSendCode();
    setModalType("send");
  };

  const handleVerify = () => {
    if (timeLeft === 0) {
      setCodeError("인증번호가 만료되었습니다");
      return;
    }

    if (code.length !== 6) {
      setCodeError("인증번호를 다시 입력해 주세요");
      return;
    }

    setCodeError(undefined);
    setModalType("verify");
  };

  const handleResend = () => handleSendCode();

  return (
    <div className="pt-[241px] w-[352px] mx-auto">
      {/* 전화번호 입력 + 발송 버튼 */}
      <div className="relative w-[361px]">
        <div className="typo-h1">휴대폰 인증</div>
        <div className="relative mt-[12px]">
          <TextField
            value={phone}
            onChange={setPhone}
            placeholder="휴대폰 번호(- 없이 숫자만 입력)"
            disabled={isVerified}
            errorMessage={
              !isPhoneValid && phone
                ? "휴대폰 번호를 다시 확인해주세요"
                : undefined
            }
            rightIcon={
              !isVerified && (
                <button
                  type="button"
                  onClick={isCodeSent ? handleResend : handleSendCode}
                  disabled={!isPhoneValid || (isCodeSent && timeLeft > 0)}
                  className={`w-[102px] h-[24px] rounded-full  typo-caption text-white
          ${
            isPhoneValid && !(isCodeSent && timeLeft > 0)
              ? "bg-[#202020] border-[#202020]"
              : "bg-[#C3C3C3] border-[#C3C3C3]"
          }
          disabled:cursor-not-allowed
        `}
                >
                  {isCodeSent ? "인증번호 재발송" : "인증번호 발송"}
                </button>
              )
            }
          />
        </div>
      </div>

      {/* 인증번호 입력 + 인증 확인 버튼 */}
      {!isVerified && (
        <div className="mt-[22px] w-[361px]">
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
            disabled={!isCodeSent || isVerified}
            errorMessage={codeError}
          />

          <Button
            size="S"
            disabled={
              !isCodeSent || isVerified || timeLeft === 0 || code.length !== 6
            }
            onClick={handleVerify}
            className="mt-[48px]"
          >
            <span className="typo-button">
              인증 확인{" "}
              {isCodeSent && !isVerified && `(${formatTime(timeLeft)})`}
            </span>
          </Button>
          <button
            type="button"
            onClick={() => setModalType("help")}
            className="
    mt-3
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
        </div>
      )}

      {/* 모달 (화면 암전 없이, 발송/인증 확인 분기) */}
      {modalType && (
        <PhoneAuthModal
          type={modalType}
          phone={phone}
          onConfirm={() => {
            if (modalType === "verify") {
              onVerifyCode(code);
            }
            setModalType(null);
          }}
          onLogin={() => {
            navigate("/login");
          }}
        />
      )}
    </div>
  );
}
