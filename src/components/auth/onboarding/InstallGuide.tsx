import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

import installGuideImage from "../../../assets/onboarding/installGuideImage.png";
import mainLogo from "../../../assets/logos/mainLogo.svg";

interface InstallGuideProps {
  onFinish: () => void;
}

export default function InstallGuide({ onFinish }: InstallGuideProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex justify-center">
      <div className=" flex flex-col items-center relative">
        {/* ================= 상단 (로고 + 제목 + 소제목) ================= */}
        <div className="mt-[75px] flex flex-col items-center gap-[10px] w-full">
          <div className="flex flex-col items-center gap-[2px] w-full">
            <img
              src={mainLogo}
              alt="CooKeep Logo"
              className="w-[148.81px] h-[28px]"
            />

            <h1 className="typo-result-title">
              홈 화면에서 편하게 만나보세요!
            </h1>
          </div>

          <p className="w-full text-center font-bold text-[16px] leading-[24px] text-[var(--color-green-deep)]">
            더 쉽고 빠르게 서비스를 이용할 수 있어요
          </p>
        </div>

        {/* ================= 이미지 + 그라데이션 ================= */}
        <div className="relative mt-[51px] max-w-[484px] h-[312px] w-full flex justify-center">
          <img
            src={installGuideImage}
            alt="Install Guide"
            className="max-w-[449px] w-full max-h-[300px] h-full object-cover"
            style={{ aspectRatio: "223 / 149" }}
          />

          {/* 하단 그라데이션 오버레이 */}
          <div
            className="absolute bottom-0 max-w-[449px] w-full max-h-[58px] h-full"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0) 6.45%, #FAFAFA 76.21%)",
            }}
          />
        </div>

        {/* ================= 설명 영역 ================= */}
        <div className="mt-[18px] flex flex-col items-start gap-[24px] w-full">
          {/* iOS */}
          <div className="flex flex-col gap-[10px] w-full">
            <div className="h-[38px] flex flex-col justify-center w-full">
              <p className="text-center text-[14px] font-semibold leading-[20px] text-[#7D7D7D]">
                iOS 사용자는 Safari에서 열어주세요
              </p>
              <p className="text-center text-[12px] font-medium leading-[20px] text-[#7D7D7D]">
                Safari 공유 버튼 → ‘홈 화면에 추가’
              </p>
            </div>
          </div>

          {/* Android */}
          <div className="flex flex-col gap-[10px] w-full">
            <div className="h-[38px] flex flex-col justify-center w-full">
              <p className="text-center text-[14px] font-semibold leading-[20px] text-[#7D7D7D]">
                Android 사용자는 Chrome을 추천드려요
              </p>
              <p className="text-center text-[12px] font-medium leading-[20px] text-[#7D7D7D]">
                우측 상단 메뉴 → ‘홈 화면에 추가’
              </p>
            </div>
          </div>
        </div>

        {/* ================= 하단 버튼 ================= */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 pb-[34px]">
          <div className="w-[361px] flex flex-col items-center gap-[8px]">
            <Button size="S" variant="green" onClick={onFinish}>
              확인
            </Button>

            <button
              onClick={() =>
                navigate("/settings/faq", {
                  state: { openCategoryId: 4 },
                })
              }
              className="typo-caption text-[#7D7D7D] underline"
            >
              자세한 설명 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
