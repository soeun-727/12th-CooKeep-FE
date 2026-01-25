import { useState, useEffect } from "react";
import TextField from "../../ui/TextField";
import Button from "../../ui/Button";
import FindPhoneAuthModal from "../../auth/find/FindPhoneAuthModal";
import { useEditPasswordAuthStore } from "../../../stores/useEditPasswordAuthStore";

import { useNavigate } from "react-router-dom";

export default function EditPasswordPhoneSection() {
  const navigate = useNavigate();

  const { phone, setPhone, isCodeSent, sendCode, verifyCode, reset } =
    useEditPasswordAuthStore();

  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string>();
  const [timeLeft, setTimeLeft] = useState(180);
  const [timerActive, setTimerActive] = useState(false);

  type ModalType = "send" | "verify" | "help";
  const [modalType, setModalType] = useState<ModalType | null>(null);

  const isPhoneValid = /^01[0-9]{9}$/.test(phone.replace(/-/g, ""));

  /* 타이머 */
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

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
      2,
      "0",
    )}`;

  /* 인증번호 발송 */
  const handleSendCode = async () => {
    setCode("");
    setCodeError(undefined);
    setTimeLeft(300);
    setTimerActive(true);

    await sendCode();
    setModalType("send");
  };
  /* 인증번호 재발송 */
  const [resendCount, setResendCount] = useState(0);
  const MAX_RESEND = 3;

  const handleResend = async () => {
    if (resendCount >= MAX_RESEND) {
      setCodeError("인증번호 재발송 횟수를 초과했습니다");
      return;
    }

    setResendCount((prev) => prev + 1);
    setCode("");
    setCodeError(undefined);
    setTimeLeft(300);
    setTimerActive(true);

    await sendCode(); // 같은 API 재사용
    setModalType("send");
  };

  /* 인증 확인 */
  const handleVerify = async () => {
    if (code.length !== 6) {
      setCodeError("인증번호를 다시 입력해 주세요");
      return;
    }

    const success = await verifyCode(code);
    if (success) {
      setTimerActive(false);
      setModalType("verify");
    } else {
      setCodeError("인증번호를 다시 입력해 주세요");
    }
  };

  return (
    <div className="pt-[241px] w-[352px] mx-auto">
      <div className="typo-h1">휴대폰 인증</div>

      {/* 전화번호 */}
      <div className="mt-[12px]">
        <TextField
          value={phone}
          onChange={setPhone}
          placeholder="휴대폰 번호 (- 없이 입력)"
          errorMessage={
            phone && !isPhoneValid
              ? "휴대폰 번호를 다시 확인해주세요"
              : undefined
          }
          rightIcon={
            <button
              type="button"
              onClick={isCodeSent ? handleResend : handleSendCode}
              disabled={!isPhoneValid || resendCount >= MAX_RESEND}
              className={`w-[102px] h-[24px] rounded-full  typo-caption text-white
          ${
            isPhoneValid
              ? "bg-[#202020] border-[#202020]"
              : "bg-[#C3C3C3] border-[#C3C3C3]"
          } disabled:cursor-not-allowed`}
            >
              {isCodeSent ? "인증번호 재발송" : "인증번호 발송"}
            </button>
          }
        />
      </div>
      {/* 인증번호 */}
      <div className="mt-[5px]">
        <TextField
          value={code}
          onChange={(v) => {
            const onlyNumber = v.replace(/[^0-9]/g, "");
            setCode(onlyNumber);

            // 사용자가 다시 입력 시작하면 에러 제거
            if (codeError) setCodeError(undefined);
          }}
          placeholder="인증번호 입력"
          disabled={!isCodeSent}
          errorMessage={codeError}
        />

        <Button
          size="S"
          disabled={!isCodeSent || timeLeft === 0 || code.length !== 6}
          onClick={handleVerify}
          className="mt-[31px]"
        >
          <span className="typo-button">
            인증하기 {isCodeSent && `(${formatTime(timeLeft)})`}
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
              reset();
              navigate("/settings/password", {
                state: { verifiedBy: "phone" },
              });
            }
            setModalType(null);
          }}
        />
      )}
    </div>
  );
}
