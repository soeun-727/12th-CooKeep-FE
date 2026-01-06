import React, { useState, useEffect } from "react";
import Button from "../../ui/Button";
import TextField from "../../ui/TextField";
import FindPhoneAuthModal from "./FindPhoneAuthModal";
import { useNavigate } from "react-router-dom";
import { useSignupStore } from "../../../stores/useSignupStore";

export default function FindPhoneSection() {
  const { phone, setPhone, isCodeSent, sendCode, verifyCode } =
    useSignupStore();

  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string | undefined>();
  const [timeLeft, setTimeLeft] = useState(180);
  const [timerActive, setTimerActive] = useState(false);

  type ModalType = "send" | "verify" | "notRegistered" | "help";
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

  // 인증번호 발송
  const handleSendCode = async () => {
    // TODO: 실제 API로 가입 여부 체크
    const isRegistered = true; // 실제로는 서버 호출
    if (!isRegistered) {
      setModalType("notRegistered");
      return;
    }

    setCode("");
    setCodeError(undefined);
    setTimeLeft(300);
    setTimerActive(true);

    sendCode();
    setModalType("send");
  };

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
      setModalType("verify");
    } else {
      setCodeError("인증번호를 다시 입력해 주세요");
    }
  };

  const handleResend = () => handleSendCode();

  return (
    <div className="pt-[241px] w-[352px] mx-auto">
      {/* 전화번호 입력 */}
      <div className="relative w-[361px]">
        <div className="typo-h1">비밀번호 찾기</div>
        <div className="relative mt-[12px]">
          <TextField
            value={phone}
            onChange={setPhone}
            placeholder="휴대폰 번호(- 없이 숫자만 입력)"
            errorMessage={
              !isPhoneValid && phone
                ? "휴대폰 번호를 다시 확인해주세요"
                : undefined
            }
            rightIcon={
              <button
                type="button"
                onClick={isCodeSent ? handleResend : handleSendCode}
                disabled={!isPhoneValid || (isCodeSent && timeLeft > 0)}
                className={`w-[102px] h-[24px] rounded-full  typo-caption text-white
          ${
            isPhoneValid && !(isCodeSent && timeLeft > 0)
              ? "bg-[#202020] border-[#202020]"
              : "bg-[#C3C3C3] border-[#C3C3C3]"
          } disabled:cursor-not-allowed`}
              >
                {isCodeSent ? "인증번호 재발송" : "인증번호 발송"}
              </button>
            }
          />
        </div>
      </div>

      {/* 인증번호 입력 */}
      <div className="mt-[22px] w-[361px]">
        <TextField
          value={code}
          onChange={(value) => {
            const onlyNumber = value.replace(/[^0-9]/g, "");
            setCode(onlyNumber);

            if (!onlyNumber) setCodeError(undefined);
            else if (onlyNumber.length !== 6)
              setCodeError("인증번호를 다시 입력해 주세요");
            else setCodeError(undefined);
          }}
          placeholder="인증번호 입력"
          disabled={!isCodeSent}
          errorMessage={codeError}
        />

        <Button
          size="S"
          disabled={!isCodeSent || timeLeft === 0 || code.length !== 6}
          onClick={handleVerify}
          className="mt-[48px]"
        >
          <span className="typo-button">
            인증 확인 {isCodeSent && `(${formatTime(timeLeft)})`}
          </span>
        </Button>
        <button
          type="button"
          onClick={() => setModalType("help")}
          className="mt-3 w-[361px] typo-caption text-[#7D7D7D] text-center underline cursor-pointer bg-transparent"
        >
          인증 번호가 발송되지 않나요?
        </button>
      </div>

      {/* 모달 */}
      {modalType && (
        <FindPhoneAuthModal
          type={modalType}
          phone={phone}
          onConfirm={() => {
            if (modalType === "verify") {
              navigate("/reset-password"); // 인증 완료 후 비밀번호 재설정 페이지로 이동
            }
            setModalType(null);
          }}
          onSignup={() => navigate("/signup")} // 회원가입 이동
        />
      )}
    </div>
  );
}
