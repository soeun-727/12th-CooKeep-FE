import React, { useState, useEffect } from "react";

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
  const [codeError, setCodeError] = useState<string | undefined>(undefined);
  const [timeLeft, setTimeLeft] = useState(180); // 3분 타이머
  const [timerActive, setTimerActive] = useState(false);

  const isPhoneValid = /^01[0-9]{9}$/.test(phone.replace(/-/g, ""));
  const isCodeValid = code.length === 6;

  // 타이머 시작: 인증번호 발송 후
  useEffect(() => {
    if (!isCodeSent || isVerified) {
      const t = setTimeout(() => setTimerActive(false), 0); // 비동기 처리
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setTimeLeft(300); // 초기화
      setTimerActive(true);
    }, 0);

    return () => clearTimeout(t);
  }, [isCodeSent, isVerified]);

  // 타이머 카운트다운
  useEffect(() => {
    if (!timerActive) return;
    if (timeLeft <= 0) {
      const t = setTimeout(() => setTimerActive(false), 0); // 비동기 처리
      return () => clearTimeout(t);
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, timerActive]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleResend = () => {
    onSendCode();
    setCode("");
    setCodeError(undefined);
    setTimeLeft(180);
    setTimerActive(true);
  };

  return (
    <div className="space-y-3">
      {/* 휴대폰 입력 + 버튼 */}
      <div className="relative w-[361px]">
        <div className="typo-h1">로그인</div>
        <div className="relative">
          <input
            type="tel"
            placeholder="01012345678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full h-[48px] border border-[#D1D1D1] rounded-[6px] pr-[122px] px-3"
            disabled={isVerified}
          />
          <div className="absolute inset-y-0 right-2 flex items-center">
            <button
              type="button"
              onClick={onSendCode}
              disabled={!isPhoneValid || isCodeSent || isVerified}
              className={`w-[102px] h-[24px] rounded-full text-xs font-normal text-white
                ${
                  isPhoneValid && !isCodeSent && !isVerified
                    ? "bg-[#202020] border-[#202020]"
                    : "bg-[#7D7D7D] border-[#7D7D7D]"
                }
                disabled:cursor-not-allowed
              `}
            >
              인증번호 발송
            </button>
          </div>
        </div>
        {!isPhoneValid && phone && (
          <p className="text-xs text-red-500 mt-1 text-left">
            올바른 휴대폰 번호를 입력해주세요.
          </p>
        )}
      </div>

      {/* 인증번호 입력 + 인증 확인 + 타이머 + 재발송 */}
      <div className="space-y-2 w-[361px]">
        <label className="block text-sm font-medium mb-1">인증번호 입력</label>
        <input
          type="text"
          placeholder="6자리 인증번호"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            if (codeError) setCodeError(undefined);
          }}
          className="w-full h-[48px] border border-[#D1D1D1] rounded-[6px] px-3 py-2"
          disabled={!isCodeSent || isVerified}
        />
        {codeError && <p className="text-xs text-red-500">{codeError}</p>}

        <button
          type="button"
          onClick={() => {
            if (!isCodeValid) {
              setCodeError("6자리 숫자를 입력해주세요.");
            } else {
              onVerifyCode(code);
              setCodeError(undefined);
            }
          }}
          disabled={!isCodeSent || !isCodeValid || isVerified}
          className={`w-full h-[40px] rounded-md text-white
            ${
              isCodeSent && isCodeValid && !isVerified
                ? "bg-[#202020]"
                : "bg-[#7D7D7D]"
            } disabled:cursor-not-allowed`}
        >
          인증 확인 {isCodeSent && !isVerified && `(${formatTime(timeLeft)})`}
        </button>

        <button
          type="button"
          onClick={handleResend}
          disabled={timeLeft > 0 || !isCodeSent || isVerified}
          className="w-full h-[32px] text-xs text-blue-500 underline disabled:text-gray-300"
        >
          인증번호 재발송
        </button>
      </div>

      {isVerified && <p className="text-green-500 font-medium">인증 완료 ✅</p>}
    </div>
  );
}
