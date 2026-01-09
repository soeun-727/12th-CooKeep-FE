// src/components/auth/AuthHeader.tsx
import Logo from "../../assets/Logo_black.svg";

const AuthHeader = () => {
  return (
    <header
      className="
        fixed top-0 z-50
        left-1/2 -translate-x-1/2
        w-full max-w-[450px]
        flex items-start justify-between
        px-4 py-3
        bg-[#FAFAFA]
      "
    >
      <img src={Logo} alt="CooKeep logo" className="w-[70px] h-[20px]" />

      <p className="flex items-center gap-[6px] typo-label">
        <span className="text-[#7D7D7D]">맛있는 습관이 이어지는 곳,</span>
        <span className="text-[var(--color-green-deep)]">쿠킵</span>
      </p>
    </header>
  );
};

export default AuthHeader;
