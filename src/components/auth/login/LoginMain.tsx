import TextField from "../../ui/TextField";
import phoneIcon from "../../../assets/login/phone.svg";
import pwIcon from "../../../assets/login/key.svg";
import pwImage from "../../../assets/login/pw.svg";
import Button from "../../ui/Button";
import { useState } from "react";

export default function LoginMain() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const isValidPhone = /^01[0-9]{8,9}$/.test(phoneNumber);
  const isValidPW = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  return (
    <>
      <div className="pt-[241px] w-[352px] mx-auto">
        <div className="typo-h1">로그인</div>

        {/* 입력 영역 */}
        <div className="flex flex-col mt-[12px]">
          <TextField
            value={phoneNumber}
            placeholder="휴대폰 번호(- 없이 숫자만 입력)"
            onChange={setPhoneNumber}
            errorMessage={
              phoneNumber && !isValidPhone
                ? "잘못된 휴대폰 번호입니다"
                : undefined
            }
            leftIcon={<img src={phoneIcon} alt="" />}
          />

          <div className="mt-[22px]" />

          <TextField
            value={password}
            placeholder="영문, 숫자 포함 8자 이상의 비밀번호"
            type="password"
            onChange={setPassword}
            errorMessage={
              password && !isValidPW ? "잘못된 비밀번호입니다" : undefined
            }
            leftIcon={<img src={pwIcon} alt="" />}
            rightIcon={<img src={pwImage} alt="" />}
          />
        </div>
      </div>

      {/* 버튼 */}
      <div className="mt-[48px] flex justify-center">
        <Button size="L">로그인</Button>
      </div>
    </>
  );
}
