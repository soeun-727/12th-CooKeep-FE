import Button from "../../ui/Button";
import temp from "../../../assets/temporary-image.png";
import { useNavigate } from "react-router-dom";

export default function Notification() {
  const navigate = useNavigate();

  const handleFinish = () => {
    // 알림 권한 요청 로직이 들어갈 자리
    // 이후 메인 대시보드로 이동
    navigate("/dashboard");
  };

  return (
    <>
      <div className="flex flex-col items-center w-[361px] mx-auto">
        <h1 className="typo-h1 mt-[166px] text-center">
          쿠킵 루틴, 알림으로 받아보시겠어요?
        </h1>
        {/* 설명 문구는 h1보다는 조금 작은 폰트나 body급이 가독성이 좋습니다. */}
        <p className="typo-body2 text-gray-500 mt-4 text-center break-keep">
          유통기한 임박, 주간 목표, 물 주기처럼 까먹지 않게 필요한 순간에만
          도와드릴게요. 언제든지 설정에서 변경할 수 있어요.
        </p>

        <img src={temp} className="w-[184px] mt-[122px]" />
      </div>

      <div className="fixed bottom-0 mb-[34px] left-1/2 -translate-x-1/2 flex flex-col gap-2">
        <Button
          size="S"
          className="!bg-[var(--color-green-deep)]"
          onClick={handleFinish}
        >
          알림을 켤게요
        </Button>
        <Button size="S" className="!bg-gray-300" onClick={handleFinish}>
          괜찮아요
        </Button>
      </div>
    </>
  );
}
