import React, { useState } from "react";
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

interface AgreementItem {
  key: keyof Agreements;
  label: string;
  content: string;
}

// -------------------- 약관 전문 --------------------
const AGREEMENTS: AgreementItem[] = [
  {
    key: "terms",
    label: "서비스 이용 약관 (필수)",
    content: `서비스 이용 약관 전문입니다.
여기에 약관 내용을 길게 넣어도 됩니다.`,
  },
  {
    key: "privacy",
    label: "개인정보 수집 및 이용 동의 (필수)",
    content: `개인정보 처리방침 전문입니다.
스크롤이 자동으로 적용됩니다.`,
  },
  {
    key: "age",
    label: "만 14세 이상입니다 (필수)",
    content: `본인은 만 14세 이상임을 확인합니다.`,
  },
  {
    key: "marketing",
    label: "마케팅 활용 및 광고 수신 동의 (선택)",
    content: `마케팅 정보 수신에 대한 내용입니다.`,
  },
];

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
  const [modal, setModal] = useState<AgreementItem | null>(null);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid =
    password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
  const isPasswordMatch = password === passwordConfirm;

  const isAllChecked = Object.values(agreements).every(Boolean);

  return (
    <div className="space-y-4">
      {/* 이메일 */}
      <TextField
        label="이메일"
        value={email}
        onChange={setEmail}
        errorMessage={
          email && !isEmailValid ? "올바른 이메일을 입력해주세요." : undefined
        }
      />

      {/* 비밀번호 */}
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

      {/* 비밀번호 확인 */}
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

      {/* 약관 영역 */}
      <div className="pt-2 space-y-3">
        {/* 전체 동의 */}
        <label className="flex items-center gap-2 font-semibold text-sm border-b pb-2">
          <input
            type="checkbox"
            checked={isAllChecked}
            onChange={(e) =>
              updateAgreements({
                terms: e.target.checked,
                privacy: e.target.checked,
                age: e.target.checked,
                marketing: e.target.checked,
              })
            }
          />
          약관 전체동의
        </label>

        {/* 개별 약관 */}
        {AGREEMENTS.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between text-sm"
          >
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={agreements[item.key]}
                onChange={(e) =>
                  updateAgreements({ [item.key]: e.target.checked })
                }
              />
              {item.label}
            </label>
            <button
              type="button"
              className="text-xs text-gray-400 underline"
              onClick={() => setModal(item)}
            >
              자세히
            </button>
          </div>
        ))}
      </div>

      {/* 회원가입 버튼 */}
      <Button
        type="submit"
        size="L"
        disabled={!isSignupEnabled}
        onClick={onSubmit}
      >
        회원가입
      </Button>

      {/* 약관 모달 */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white w-[90%] max-w-md h-[70%] rounded-lg p-4 flex flex-col">
            <h2 className="font-bold text-base mb-3">{modal.label}</h2>

            <div className="flex-1 overflow-y-auto text-sm whitespace-pre-wrap mb-4">
              {modal.content}
            </div>

            <Button size="L" onClick={() => setModal(null)}>
              확인
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
