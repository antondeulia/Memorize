"use client";

import { usePracticeStore } from "@/store/practiceStore";
import Button from "../ui/Button";

const PracticeButtons = () => {
  const { handleCheck, isChecking, userText, isWrong, isCorrect } =
    usePracticeStore();

  return (
    <>
      {!isWrong && !isCorrect && (
        <div className="flex flex-col mt-[60px]">
          <div className="w-full h-[1px] bg-gray-200" />
          <div className="w-[1000px] mt-10 mx-auto flex items-center h-full justify-between">
            {/* TODO: skip functionality */}
            <Button
              text="skip"
              handleClick={() => console.log("skip")}
              className="py-4 duration-300 transition-all w-[175px] rounded-[25px] text-[16px] text-gray-400 border-2 border-b-[6px] active:scale-95 outline-none uppercase"
            />
            <Button
              text="check"
              handleClick={handleCheck}
              isLoading={isChecking}
              className="py-4 duration-300 transition-all w-[175px] rounded-[25px] text-[16px] text-white active:scale-95 outline-none uppercase"
              style={{
                background: userText ? "#58CC02" : "#E5E5E5",
                boxShadow: userText && "0px 6px 0px #3b8801",
                color: userText ? "white" : "gray",
                transform: "translateY(-2px)",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PracticeButtons;
