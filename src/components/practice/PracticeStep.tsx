"use client";

import { IPracticeStep } from "@/types";
import PracticeText from "./PracticeText";
import { ChangeEvent, useCallback, useEffect, useRef } from "react";
import PracticeContinue from "./PracticeContinue";
import { usePracticeStore } from "@/store/practiceStore";

type PracticeStepProps = {
  step: IPracticeStep;
};

const PracticeStep = ({ step }: PracticeStepProps) => {
  const { userText, setUserText, isCorrect, isWrong, handleCheck, addStep } =
    usePracticeStore();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const onCheckBegin = useCallback(async () => {
    if (step.text === "Let's begin") {
      await addStep();
    }
  }, []);

  useEffect(() => {
    onCheckBegin();
  }, [onCheckBegin]);

  return (
    <li>
      <div className="w-[75%] mx-auto">
        <PracticeText text={step.text} translation={step.translation} />
        <textarea
          ref={textareaRef}
          className="resize-none block mt-[60px] w-[100%] h-[180px] rounded-xl p-4 text-[18px] bg-[#F7F7F7] outline-none border-2"
          placeholder="Enter a translation in any language"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleCheck();
            }
          }}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setUserText(e.target.value)
          }
          value={userText}
        />
      </div>

      {isWrong && (
        <PracticeContinue
          icon="/icons/wrong.png"
          alt="Wrong"
          text="Correct solution"
          color="#EA2B2B"
          bgColor="#FFDFE0"
          btnStyle={{
            backgroundColor: "#FF4B4B",
            borderBottom: "6px solid #FF2F2F",
            padding: "15px 0",
          }}
        />
      )}
      {isCorrect && (
        <PracticeContinue
          icon="/icons/correct.png"
          alt="Correct"
          text="Great job!"
          color="#58A700"
          bgColor="#D7FFB8"
          btnStyle={{
            backgroundColor: "#58CC02",
            borderBottom: "6px solid #58A700",
            padding: "15px 0",
          }}
          // btnStyle="#58CC02"
        />
      )}
    </li>
  );
};

export default PracticeStep;
