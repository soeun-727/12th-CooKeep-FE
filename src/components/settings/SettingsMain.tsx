import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProfileSection from "./sections/ProfileSection";
import NotificationSection from "./sections/NotificationSection";
import SupportSection from "./sections/SupportSection";
import logoutIcon from "../../assets/settings/logout.svg";
import ConfirmModal from "../ui/ConfirmModal";

export default function SettingsMain() {
  const navigate = useNavigate();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const handleLogoutConfirm = () => {
    setOpenLogoutModal(false);

    // TODO: 토큰 / 상태 초기화 필요하면 여기서
    // localStorage.clear();
    // zustand reset 등

    navigate("/", { replace: true }); // 완전 첫 페이지
  };

  return (
    <>
      <main className="pt-[157px] px-4">
        <div className="space-y-6">
          <ProfileSection />
          <NotificationSection />
          <SupportSection />
        </div>

        {/* ===== 하단 버튼 영역 ===== */}
        <div className="mt-[14px] flex flex-col items-center">
          {/* 로그아웃 */}
          <button
            onClick={() => setOpenLogoutModal(true)}
            className="inline-flex items-center gap-1"
          >
            <img
              src={logoutIcon}
              alt="logout"
              className="w-6 h-6 aspect-square"
            />
            <span className="text-[14px] font-medium leading-[20px] text-[#111]">
              로그아웃
            </span>
          </button>

          {/* 탈퇴하기 */}
          <button
            onClick={() => navigate("/withdraw")}
            className="mt-[42px] text-[12px] font-normal leading-[16px] text-[#7D7D7D] underline"
          >
            탈퇴하기
          </button>
        </div>
      </main>

      {/* 로그아웃 모달 */}
      {openLogoutModal && (
        <ConfirmModal
          message="로그아웃 하시겠습니까?"
          onConfirm={handleLogoutConfirm}
          onCancel={() => setOpenLogoutModal(false)}
        />
      )}
    </>
  );
}
