import React, { useState } from "react";
import PhoneSection from "./PhoneSection";
import AccountSection from "./AccountSection";
import SuccessSection from "./SuccessSection";
import { useSignupStore } from "../../../stores/useSignupStore";

interface Agreements {
  terms: boolean;
  privacy: boolean;
  age: boolean;
  marketing: boolean;
}

export default function SignupForm() {
  const [isFinished, setIsFinished] = useState(false);
  const [serverError, setServerError] = useState<string | undefined>();

  // 전화 인증 결과만 구독
  const isVerified = useSignupStore((s) => s.isVerified);

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

  const isPasswordValid =
    password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);

  const isPasswordMatch = password === passwordConfirm;
  const isRequiredAgreed =
    agreements.terms && agreements.privacy && agreements.age;

  const isSignupEnabled =
    isVerified && isPasswordValid && isPasswordMatch && isRequiredAgreed;

  const handleSubmit = () => {
    if (!isSignupEnabled) {
      setServerError("모든 필수 항목을 확인해주세요.");
      return;
    }
    setServerError(undefined);
    setIsFinished(true);
  };

  const updateAgreements = (next: Partial<Agreements>) => {
    setAgreements({ ...agreements, ...next });
  };

  if (isFinished) return <SuccessSection />;

  return (
    <div className="flex flex-col gap-4">
      {/* ✅ props 없이 */}
      <PhoneSection />

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
