"use client";

import PracticeStep from "./PracticeStep";
import { usePracticeStore } from "@/store/practiceStore";

const PracticeSteps = () => {
  const { steps, currentStep } = usePracticeStore();

  return (
    <div className="w-[90%] mx-auto flex flex-col gap-[75px] mt-8">
      <h2 className="text-[#3C3C3C] text-[32px] font-bold">
        Write in any language
      </h2>
      <ul>
        {steps.map((step, index) => {
          if (currentStep === index) {
            return <PracticeStep key={index} step={step} />;
          }
        })}
      </ul>
    </div>
  );
};

export default PracticeSteps;
