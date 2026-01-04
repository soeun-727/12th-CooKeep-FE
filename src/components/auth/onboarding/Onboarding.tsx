import { useState } from "react";
import Footer from "./Footer";
import Progress from "./Progress";
import FoodType from "./FoodType";
import Skill from "./Skill";
import Goal from "./Goal";

export default function Onboarding() {
  const [step, setStep] = useState(0);
  //응답 db 저장 로직 필요

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };
  const prevStep = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };

  //컴포넌트 배열
  const STEPS = [];
  return (
    <div className="flex flex-col min-h-screen items-center">
      <Progress currentStep={step} />
      <Goal />
      <Footer />
    </div>
  );
}
