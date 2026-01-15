import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackHeader from "../../ui/BackHeader";
import Button from "../../ui/Button";
import illustration from "../../../assets/temp_simplelogin_icon.svg";
import AgreementList from "./AgreementList";

export default function SimpleLoginAgreement() {
  const navigate = useNavigate();

  const [agreements, setAgreements] = useState<Record<string, boolean>>({
    terms: false,
    privacy: false,
    marketing: false,
    policy: true,
  });

  return (
    <>
      <BackHeader title="약관 동의" onBack={() => navigate(-1)} />

      {/* 회원가입과 동일한 컨테이너 */}
      <div className="pt-[285px] mx-auto w-full max-w-[375px]">
        {/* 일러스트 */}
        <div className="flex w-[71.131px] h-[95.495px]">
          <img src={illustration} alt="약관 동의 일러스트" />
        </div>

        {/* 타이틀 */}
        <h1 className="typo-h2 mt-[29.5px]">
          서비스 이용을 위해 <br />
          약관 동의가 필요해요
        </h1>

        {/* 약관 영역 */}
        <AgreementList
          agreements={agreements}
          updateAgreements={(next) =>
            setAgreements((prev) => ({ ...prev, ...next }))
          }
        />

        {/* 버튼 */}
        <div className="mt-[10px] ">
          <Button
            size="L"
            variant="green"
            disabled={!(agreements.terms && agreements.privacy)}
            onClick={() => navigate("/onboarding")}
            className="mt-[8px]"
          >
            시작하기
          </Button>
        </div>
      </div>
    </>
  );
}
