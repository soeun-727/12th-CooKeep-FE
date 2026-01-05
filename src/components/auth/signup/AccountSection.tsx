import React from "react";
import TextField from "../../ui/TextField";
import Button from "../../ui/Button";

// -------------------- Types --------------------
interface Agreements {
  terms: boolean;
  privacy: boolean;
  age: boolean;
  marketing: boolean;
}

interface AccountSectionProps {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  passwordConfirm: string;
  setPasswordConfirm: (value: string) => void;
  agreements: Agreements;
  updateAgreements: (next: Partial<Agreements>) => void;
  onSubmit: () => void;
  isSignupEnabled: boolean;
}

// -------------------- Component --------------------
export default function AccountSection({
  email,
  setEmail,
  password,
  setPassword,
  passwordConfirm,
  setPasswordConfirm,
  agreements,
  updateAgreements,
  onSubmit,
  isSignupEnabled,
}: AccountSectionProps) {
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid =
    password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
  const isPasswordMatch = password === passwordConfirm;

  return (
    <div className="space-y-3">
      <TextField
        label="이메일"
        value={email}
        onChange={setEmail}
        errorMessage={
          email && !isEmailValid ? "올바른 이메일을 입력해주세요." : undefined
        }
      />
      <TextField
        label="비밀번호"
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="영문+숫자 8자 이상"
        errorMessage={
          password && !isPasswordValid
            ? "영문과 숫자를 포함한 8자 이상이어야 합니다."
            : undefined
        }
      />
      <TextField
        label="비밀번호 확인"
        type="password"
        value={passwordConfirm}
        onChange={setPasswordConfirm}
        errorMessage={
          passwordConfirm && !isPasswordMatch
            ? "비밀번호가 일치하지 않습니다."
            : undefined
        }
      />

      {/* 약관 */}
      {/* 전체 동의 */}
      <label className="flex items-center gap-2 text-sm font-bold border-b pb-2 mb-2">
        <input
          type="checkbox"
          checked={Object.values(agreements).every((v) => v)}
          onChange={(e) => {
            const isAllChecked = e.target.checked;
            updateAgreements({
              terms: isAllChecked,
              privacy: isAllChecked,
              age: isAllChecked,
              marketing: isAllChecked,
            });
          }}
        />
        전체 동의하기
      </label>

      {/* 개별 약관 리스트 */}
      <div className="space-y-2">
        {[
          { key: "terms", label: "이용약관 동의 (필수)" },
          { key: "privacy", label: "개인정보처리방침 동의 (필수)" },
          { key: "age", label: "만 14세 이상입니다 (필수)" },
          { key: "marketing", label: "마케팅 정보 수신 동의 (선택)" },
        ].map(({ key, label }) => (
          <div key={key} className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={agreements[key as keyof Agreements]}
                onChange={(e) => updateAgreements({ [key]: e.target.checked })}
              />
              {label}
            </label>
            {/* 자세히 보기 버튼 (텍스트 형태) */}
            <button
              type="button"
              className="text-xs text-gray-400 underline"
              onClick={() => alert(`${label} 상세 팝업 오픈`)} // 여기에 모달 오픈 함수 연결
            >
              자세히
            </button>
          </div>
        ))}
      </div>

      <Button
        type="submit"
        size="L"
        onClick={onSubmit}
        disabled={!isSignupEnabled}
      >
        회원가입
      </Button>
    </div>
  );
}
