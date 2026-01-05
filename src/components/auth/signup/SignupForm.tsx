import React, { useState } from "react";
import PhoneSection from "./PhoneSection";
import AccountSection from "./AccountSection";
import SuccessSection from "./SuccessSection";

// -------------------- Types --------------------
interface Agreements {
  terms: boolean;
  privacy: boolean;
  age: boolean;
  marketing: boolean;
}

// -------------------- Component --------------------
export default function SignupForm() {
  // ---------- 상태 ----------
  const [isFinished, setIsFinished] = useState(false); // 가입 완료 여부
  const [serverError, setServerError] = useState<string | undefined>(undefined);

  // 전화 인증
  const [phone, setPhone] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // 계정 정보
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // 약관 동의
  const [agreements, setAgreements] = useState<Agreements>({
    terms: false,
    privacy: false,
    age: false,
    marketing: false,
  });

  // ---------- Validation ----------
  const isPhoneValid = /^01[0-9]{8,9}$/.test(phone.replace(/-/g, ""));
  const isPasswordValid =
    password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
  const isPasswordMatch = password === passwordConfirm;
  const isRequiredAgreed =
    agreements.terms && agreements.privacy && agreements.age;
  const isSignupEnabled =
    isVerified && isPasswordValid && isPasswordMatch && isRequiredAgreed;

  // ---------- Handlers (UI용) ----------
  const handleSendCode = () => {
    if (!isPhoneValid) {
      setServerError("올바른 전화번호를 입력해주세요.");
      return;
    }
    setIsCodeSent(true);
    setServerError(undefined);
  };

  const handleVerifyCode = (code: string) => {
    if (code.length === 6) {
      setIsVerified(true);
      setServerError(undefined);
    } else {
      setServerError("인증번호가 올바르지 않습니다.");
    }
  };

  const handleSubmit = () => {
    if (!isSignupEnabled) {
      setServerError("모든 필수 항목을 확인해주세요.");
      return;
    }
    setServerError(undefined);
    setIsFinished(true); // 가입 완료 화면
  };

  const updateAgreements = (next: Partial<Agreements>) => {
    setAgreements({ ...agreements, ...next });
  };

  // ---------- 조건부 렌더링 ----------
  if (isFinished) return <SuccessSection />;

  return (
    <div className="flex flex-col gap-4">
      <PhoneSection
        phone={phone}
        setPhone={setPhone}
        isCodeSent={isCodeSent}
        isVerified={isVerified}
        onSendCode={handleSendCode}
        onVerifyCode={handleVerifyCode}
      />

      {isVerified && (
        <>
          <AccountSection
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            passwordConfirm={passwordConfirm}
            setPasswordConfirm={setPasswordConfirm}
            agreements={agreements}
            updateAgreements={updateAgreements}
            onSubmit={handleSubmit}
            isSignupEnabled={isSignupEnabled}
          />

          {/* 서버 에러 메시지 (UI 확인용) */}
          {serverError && (
            <p className="text-red-500 text-sm text-center mt-2">
              {serverError}
            </p>
          )}
        </>
      )}
    </div>
  );
}
