import Button from "../../ui/Button";
import ExampleNotification from "./ExampleNotification";
import char from "../../../assets/character/noti_char.svg";
import { useState } from "react";
import { updatePushConsent } from "../../../api/user";

const EXAMPLE_DATA = [
  {
    title: "유통기한 임박 🚨",
    description: "두부 유통기한이 하루 남았어요!\n지금 요리하러 가볼까요?",
  },
  {
    title: "주간 목표 달성 🎉",
    description:
      "'주 3회 요리하기' 목표를 달성했어요\n쿠키 리워드를 확인해보세요!",
  },
  {
    title: "식물에 물 줄 시간 🌱",
    description:
      "토마토가 시들고 있어요\n보유하신 쿠키를 사용해 물을 줄 수 있어요",
  },
  {
    title: "오늘의 쿠킵 레시피 🍳",
    description:
      "지금 있는 재료로 만들 수 있는 요리가 있어요\n지금 레시피를 확인해보세요!",
  },
];

interface Props {
  onNext: () => void;
}

export default function Notification({ onNext }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const INFINITE_DATA = [...EXAMPLE_DATA, ...EXAMPLE_DATA];

  const handlePushConsent = async (isAgreed: boolean) => {
    setIsLoading(true);
    try {
      // isAgreed에 따라 true 또는 false가 전송됩니다.
      await updatePushConsent(isAgreed);
      console.log(`알림 설정 업데이트 성공 (${isAgreed ? "동의" : "거절"})`);
    } catch (error) {
      console.error("알림 설정 실패:", error);
      // 에러가 나더라도 다음 단계로 보내줄지, 아니면 멈출지 결정할 수 있습니다.
    } finally {
      setIsLoading(false);
      onNext(); // 성공/실패 여부와 상관없이 다음 단계(설치 안내 등)로 이동
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col w-[361px] mx-auto">
        <h1 className="typo-h1 mt-[107px] text-left">
          쿠킵 루틴, 알림으로 받아보시겠어요?
        </h1>
        <p className="typo-body2 text-gray-500 mt-1 text-left break-keep">
          유통기한 임박, 주간 목표, 물 주기처럼 까먹지 않게
          <br />
          필요한 순간에만 도와드릴게요.
          <br />
          언제든지 설정에서 변경할 수 있어요.
        </p>

        <div className="relative flex flex-col items-center justify-start h-71 overflow-hidden mt-14 mb-[140px]">
          <div className="absolute -top-6 left-0 w-full h-12 bg-gradient-to-b from-[#fafafa] via-[#fafafa] to-transparent z-10" />
          <div className="flex flex-col gap-[6px] animate-roll">
            {INFINITE_DATA.map((data, index) => (
              <ExampleNotification
                key={index}
                title={data.title}
                description={data.description}
              />
            ))}
          </div>
          <div className="absolute -bottom-6 left-0 w-full h-12 bg-gradient-to-t from-[#fafafa] via-[#fafafa] to-transparent z-10" />
        </div>
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[361px] bg-[#fafafa] z-[100] pb-[34px] flex flex-col gap-2"> <div className="flex justify-end">
            <img src={char} className="w-[95px] mt-[35px] mb-[26.5px]" />
          </div>
          <Button
            size="S"
            variant="black"
            onClick={() => handlePushConsent(true)}
            disabled={isLoading}
          >
            알림을 켤게요
          </Button>
          <Button
            size="S"
            className="!bg-gray-300"
            onClick={() => handlePushConsent(false)}
            disabled={isLoading}
          >
            괜찮아요
          </Button>
        </div>
      </div>
    </>
  );
}
