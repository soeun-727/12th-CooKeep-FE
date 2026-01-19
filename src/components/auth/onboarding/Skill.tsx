import SkillButton from "./SkillButton";
import one from "../../../assets/onboarding/beginner.svg";
import two from "../../../assets/onboarding/intermediate.svg";
import three from "../../../assets/onboarding/advanced.svg";
import four from "../../../assets/onboarding/pro.svg";

interface SkillProps {
  selectedSkill: string; // 부모로부터 받은 선택된 숙련도 값
  onSelect: (skill: string) => void; // 부모의 상태를 변경하는 함수
}

// 02 요리 실력
export default function Skill({ selectedSkill, onSelect }: SkillProps) {
  return (
    <>
      <div className="w-[361px] mt-[46px]">
        <h1 className="typo-h1">현재 나의 요리 실력은</h1>
        <h1 className="typo-h1">어느 정도인가요?</h1>
      </div>
      <div className="mt-11 flex flex-col gap-[10px]">
        <SkillButton
          image={one}
          title="완전 초보"
          description="계란후라이도 어려워요"
          isSelected={selectedSkill === "완전 초보"}
          onClick={() => onSelect("완전 초보")}
        />
        <SkillButton
          image={two}
          title="간단한 요리는 가능"
          description="김치볶음밥 정도는 할 수 있어요"
          isSelected={selectedSkill === "간단한 요리는 가능"}
          onClick={() => onSelect("간단한 요리는 가능")}
        />
        <SkillButton
          image={three}
          title="먹고살기에 나쁘지 않은 수준"
          description="당장 잘하지는 못해도 요리를 꽤 좋아해요"
          isSelected={selectedSkill === "먹고살기에 나쁘지 않은 수준"}
          onClick={() => onSelect("먹고살기에 나쁘지 않은 수준")}
        />
        <SkillButton
          image={four}
          title="요리 고수"
          description="어려운 요리도 잘 하는 편이예요"
          isSelected={selectedSkill === "요리 고수"}
          onClick={() => onSelect("요리 고수")}
        />
      </div>
    </>
  );
}
