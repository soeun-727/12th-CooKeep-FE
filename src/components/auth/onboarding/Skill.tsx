import SkillButton from "./SkillButton";
import one from "../../../assets/onboarding/beginner.png";
import two from "../../../assets/onboarding/intermediate.png";
import three from "../../../assets/onboarding/advanced.png";
import four from "../../../assets/onboarding/pro.png";
import { useState } from "react";

//02요리 실력
export default function Skill() {
  const [selectedTitle, setSelectedTitle] = useState<string>("");

  return (
    <>
      <div className="w-[361px] mt-[46px]">
        <h1 className="typo-h1">현재 나의 요리 실력은</h1>
        <h1 className="typo-h1">어느 정도인가요?</h1>
      </div>
      <div className="mt-11 flex flex-col gap-[10px]">
        <div>
          <SkillButton
            image={one}
            title="완전 초보"
            description="계란후라이도 어려워요"
            isSelected={selectedTitle === "완전 초보"}
            onClick={() => setSelectedTitle("완전 초보")}
          />
        </div>
        <div>
          <SkillButton
            image={two}
            title="간단한 요리는 가능"
            description="김치볶음밥 정도는 할 수 있어요"
            isSelected={selectedTitle === "간단한 요리는 가능"}
            onClick={() => setSelectedTitle("간단한 요리는 가능")}
          />
        </div>
        <div>
          <SkillButton
            image={three}
            title="먹고살기에 나쁘지 않은 수준"
            description="당장 잘하지는 못해도 요리를 꽤 좋아해요"
            isSelected={selectedTitle === "먹고살기에 나쁘지 않은 수준"}
            onClick={() => setSelectedTitle("먹고살기에 나쁘지 않은 수준")}
          />
        </div>
        <div>
          <SkillButton
            image={four}
            title="요리 고수"
            description="어려운 요리도 잘 하는 편이예요"
            isSelected={selectedTitle === "요리 고수"}
            onClick={() => setSelectedTitle("요리 고수")}
          />
        </div>
      </div>
    </>
  );
}
