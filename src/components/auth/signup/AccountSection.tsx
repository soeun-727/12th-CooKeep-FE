import React, { useState } from "react";
import TextField from "../../ui/TextField";
import Button from "../../ui/Button";
import { AGREEMENTS } from "../../../constants/agreements";
import { useSignupStore } from "../../../stores/useSignupStore";
import phoneIcon from "../../../assets/login/phone.svg";
import mailIcon from "../../../assets/signup/mail.svg";
import pwIcon from "../../../assets/login/key.svg";
import pwImage from "../../../assets/login/pw.svg";
import openpwImage from "../../../assets/signup/openpw.svg";
import checkIcon from "../../../assets/signup/check.svg";
import arrowIcon from "../../../assets/signup/arrowright.svg";
import AgreementPage from "./AgreementPage";
import type { AgreementItem } from "../../../constants/agreements";

interface Agreements {
  terms: boolean;
  privacy: boolean;
  marketing: boolean;
  policy: boolean;
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
  setHideHeader: (hide: boolean) => void;
}

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
  setHideHeader,
}: AccountSectionProps) {
  const [agreementPage, setAgreementPage] = useState<AgreementItem | null>(
    null
  );
  // Zustand에서 인증 완료된 번호 가져오기
  const phoneNumber = useSignupStore((state) => state.phone);
  const isPhoneVerified = useSignupStore((state) => state.isVerified);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid =
    password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
  const isPasswordMatch = password === passwordConfirm;
  const isAllChecked = Object.values(agreements).every(Boolean);

  // 각 입력창별로 비밀번호 표시 여부
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  // 아이콘 결정 함수
  const getPasswordIcon = () => {
    if (password && passwordConfirm && isPasswordMatch) return checkIcon;
    return showPassword ? openpwImage : pwImage;
  };

  const getPasswordConfirmIcon = () => {
    if (password && passwordConfirm && isPasswordMatch) return checkIcon;
    return showPasswordConfirm ? openpwImage : pwImage;
  };
  console.log("agreements", agreements);

  return (
    <>
      {agreementPage ? (
        <AgreementPage
          agreement={agreementPage}
          isChecked={agreements[agreementPage.key]}
          onBack={() => {
            setAgreementPage(null);
            setHideHeader(false);
          }}
          onConfirm={(key) => {
            updateAgreements({ [key]: true });
            setAgreementPage(null);
            setHideHeader(false);
          }}
        />
      ) : (
        <div className="pt-[107px] mx-auto">
          {/* 제목 */}
          <div className="typo-h1">회원가입</div>
          <div className="mx-auto mt-[12px]">
            {/* 휴대폰 번호 */}

            <TextField
              value={phoneNumber}
              placeholder="휴대폰 번호(- 없이 숫자만 입력)"
              onChange={() => {}}
              disabled
              leftIcon={<img src={phoneIcon} alt="휴대폰 아이콘" />}
            />
            <div className="mt-[5px]">
              {/* 이메일 */}
              <TextField
                value={email}
                onChange={setEmail}
                placeholder="이메일 주소 입력"
                errorMessage={
                  email && !isEmailValid
                    ? "이메일 주소를 다시 확인해 주세요"
                    : undefined
                }
                successMessage={
                  email && isEmailValid ? "사용 가능한 이메일입니다" : undefined
                }
                leftIcon={<img src={mailIcon} alt="메일 아이콘" />}
              />

              {/* 비밀번호 */}
              <div className="mt-[5px]">
                <TextField
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={setPassword}
                  placeholder="영문, 숫자 포함 8자 이상의 비밀번호"
                  errorMessage={
                    password && !isPasswordValid
                      ? "영문, 숫자 포함 8자 이상의 비밀번호를 사용해 주세요"
                      : undefined
                  }
                  successMessage={
                    password && isPasswordValid
                      ? "사용 가능한 비밀번호입니다"
                      : undefined
                  }
                  leftIcon={<img src={pwIcon} alt="" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="flex items-center justify-center h-full"
                    >
                      <img src={getPasswordIcon()} alt="비밀번호 아이콘" />
                    </button>
                  }
                />

                {/* 비밀번호 확인 */}
                <div className="mt-[5px]">
                  <TextField
                    type={showPasswordConfirm ? "text" : "password"}
                    value={passwordConfirm}
                    onChange={setPasswordConfirm}
                    placeholder="비밀번호 확인"
                    errorMessage={
                      passwordConfirm && !isPasswordMatch
                        ? "비밀번호가 일치하지 않습니다"
                        : undefined
                    }
                    successMessage={
                      passwordConfirm && isPasswordMatch
                        ? "비밀번호가 일치합니다"
                        : undefined
                    }
                    leftIcon={<img src={pwIcon} alt="" />}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() =>
                          setShowPasswordConfirm(!showPasswordConfirm)
                        }
                        className="flex items-center justify-center h-full"
                      >
                        <img
                          src={getPasswordConfirmIcon()}
                          alt="비밀번호 확인 아이콘"
                        />
                      </button>
                    }
                  />

                  {/* 약관 영역 */}
                  <div className=" mt-5">
                    {/* 전체 동의 */}
                    <label className="relative flex items-center px-3 h-[48px] w-full rounded-[6px] border border-[#D1D1D1] cursor-pointer">
                      <input
                        type="checkbox"
                        className="peer w-4 h-4 appearance-none border border-gray-300 rounded-sm checked:bg-[#1FC16F] cursor-pointer"
                        checked={isAllChecked}
                        onChange={(e) =>
                          updateAgreements({
                            terms: e.target.checked,
                            privacy: e.target.checked,
                            marketing: e.target.checked,
                          })
                        }
                      />
                      <span className="ml-[16px] typo-label text-[#202020]">
                        약관 전체동의
                      </span>
                      <span className="absolute left-3 w-4 h-4 flex items-center justify-center pointer-events-none text-white text-lg font-bold peer-checked:visible invisible">
                        ✓
                      </span>
                    </label>
                    {/* 개별 약관 박스 */}
                    <div className="w-full h-[138px] p-3 flex flex-col gap-[6px] ">
                      {AGREEMENTS.map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center justify-between w-[337px] h-[24px] mx-auto"
                        >
                          <label className="flex items-center gap-4 cursor-pointer">
                            {/* 체크박스만 조건부 */}
                            {item.key !== "policy" ? (
                              <input
                                type="checkbox"
                                className="w-4 h-4 accent-[#7D7D7D]"
                                checked={agreements[item.key]}
                                onChange={(e) =>
                                  updateAgreements({
                                    [item.key]: e.target.checked,
                                  })
                                }
                              />
                            ) : (
                              // ✔ 자리 차지용 더미 (레이아웃 유지)
                              <span className="w-4 h-4 inline-block" />
                            )}

                            {/* 텍스트는 항상 동일 위치 */}
                            <span className="typo-label text-[#7D7D7D]">
                              {item.label}
                            </span>
                          </label>

                          {/* 화살표는 항상 */}
                          <button
                            type="button"
                            onClick={() => {
                              setAgreementPage(item);
                              setHideHeader(true);
                            }}
                          >
                            {/* className="w-6 h-3 flex items-center justify-center" */}

                            <img src={arrowIcon} alt="약관 보기 화살표" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 회원가입 버튼 */}
                  <div className="mt-[22px]">
                    <Button
                      type="submit"
                      size="L"
                      disabled={!isSignupEnabled || !isPhoneVerified}
                      onClick={onSubmit}
                      className=" mt-[8px] "
                    >
                      회원가입
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
