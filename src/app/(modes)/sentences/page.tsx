"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Step = {
  translate: string;
};

const steps: Step[] = [
  {
    translate: "Hello",
  },
  {
    translate: "Coffe",
  },
  {
    translate: "Please",
  },
];

const SentencesPage = () => {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);

  const handleCheck = () => {
    // TODO: Check if user translation is correct

    if (currentStep + 1 < steps.length) {
      setCurrentStep((prev) => ++prev);
    } else {
      console.log("hello");
      router.push("/");
    }
  };

  return (
    <div className="container flex justify-center items-center h-screen">
      <div className="h-[90%] w-[90%]">
        <h1 className="text-[32px] font-bold mt-[50px]">
          Write this in English
        </h1>

        {steps.map((step, index) => {
          if (currentStep === index) {
            return (
              <div className="w-[65%] mx-auto">
                <p className="bg-white text-black p-4 px-8 rounded-2xl border-2 border-gray-400 w-max mt-[90px] text-xl cursor-default">
                  {step.translate}
                </p>

                <textarea
                  className="resize-noneblock mt-[60px] w-[100%] h-[180px] rounded-xl p-4 text-black text-[18px] bg-gray-200 outline-none border-1 border-gray-500 shadow-xl"
                  placeholder="Type in German"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCheck();
                    }
                  }}
                />
              </div>
            );
          }
        })}

        <div className="flex justify-between mt-[75px]">
          <button className="p-4 bg-gray-400 w-[150px] rounded-md shadow-xl">
            SKIP
          </button>
          <button
            className="p-4 bg-[#58CC02] hover:bg-[#61E002] duration-300 transition-all w-[150px] rounded-md shadow-xl"
            onClick={handleCheck}
          >
            CHECK
          </button>
        </div>
      </div>
    </div>
  );
};

export default SentencesPage;
