export default function RecipeLoadingSpinner() {
  const dotCount = 8;
  const containerSize = 48; // w-12 h-12
  const dotSize = 8;
  const radius = containerSize / 2 - dotSize / 2; // 20px

  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      {/* 전체 회전 컨테이너 */}
      <div className="relative w-12 h-12 animate-spin">
        {Array.from({ length: dotCount }).map((_, i) => {
          const angle = (360 / dotCount) * i;
          const rad = (angle * Math.PI) / 180;
          return (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-gray-300"
              style={{
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) translate(${radius * Math.cos(rad)}px, ${radius * Math.sin(rad)}px)`,
                animation: `dotFade 1.6s linear infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          );
        })}
      </div>

      <style>
        {`
          @keyframes dotFade {
            0%, 20% { background-color: #d9d9d9; }
            50% { background-color: #1FC16F; }
            100% { background-color: #d9d9d9; }
          }
        `}
      </style>
    </div>
  );
}
