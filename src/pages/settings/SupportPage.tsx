import { useNavigate } from "react-router-dom";
import BackHeader from "../../components/ui/BackHeader";

export default function SupportPage() {
  const navigate = useNavigate();

  const email = "cookeep2026@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      alert("이메일 주소가 복사되었습니다.");
    } catch {
      alert("복사에 실패했어요. 직접 복사해 주세요.");
    }
  };

  return (
    <>
      {/* 헤더 */}
      <BackHeader title="고객센터" onBack={() => navigate(-1)} />

      <main className="pt-[97px] px-4 flex flex-col relative">
        {/* 상단 텍스트 */}
        <section className="">
          <h2 className="typo-h1 text-left">무엇을 도와드릴까요?</h2>

          <p className="typo-body2 text-[#7D7D7D]">
            아래 이메일로 문의사항을 전송해 주시면
            <br />
            순차적으로 확인 후 안내드릴게요
          </p>
        </section>

        {/* 이메일 버튼 */}
        <button
          onClick={handleCopyEmail}
          className="
    mt-[48px]
    flex items-center justify-center
    h-[56px]
    rounded-[10px]
    bg-[#EBEBEB]
    typo-body
    text-[#202020]
  "
        >
          {email}
        </button>

        {/* 운영 시간 안내 */}
        <p className="mt-[25px] typo-caption text-[#7D7D7D]">
          운영 시간: 평일 10:00–18:00 (주말·공휴일 제외)
          <br />
          영업일 기준 2–3일 이내에 답변드려요
        </p>
      </main>
    </>
  );
}
