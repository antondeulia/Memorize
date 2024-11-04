"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";

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

const PracticePage = () => {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [currentStep, setCurrentStep] = useState(0);
  const [userText, setUserText] = useState("");

  const [isWrong, setIsWrong] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleCheck = (stepTranslate: string) => {
    if (currentStep + 1 <= steps.length) {
      console.log(stepTranslate);
      console.log(userText);

      switch (stepTranslate) {
        case "Hello":
          if (userText !== "Привет") {
            setIsWrong(true);
          } else {
            setIsCorrect(true);
          }
          break;
        case "Coffe":
          if (userText !== "кофе") {
            console.log("here?");
            setIsWrong(true);
          } else {
            console.log("or here?");
            setIsCorrect(true);
          }
          break;
        case "Please":
          if (userText !== "пожалуйста") {
            console.log("here?");
            setIsWrong(true);
          } else {
            console.log("or here?");
            setIsCorrect(true);
          }
          break;
      }
    } else {
    }
  };

  const handleContinue = () => {
    setUserText("");
    setCurrentStep((prev) => ++prev);
    setIsWrong(false);
    setIsCorrect(false);

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 0);
  };

  return (
    <>
      <div className="container flex justify-center items-center h-screen">
        <div className="h-[90%] w-[90%]">
          <h1 className="text-[32px] font-bold mt-[40px]">
            Write this in English
          </h1>

          {steps.map((step, index) => {
            if (currentStep === index) {
              return (
                <>
                  <div className="w-[75%] mx-auto mt-[85px]" key={index}>
                    <p className="bg-white text-black p-3 px-8 rounded-2xl border-2 border-gray-400 w-max text-md cursor-default">
                      {step.translate}
                    </p>
                    <textarea
                      ref={textareaRef}
                      className="resize-none block mt-[60px] w-[100%] h-[180px] rounded-xl p-4 text-black text-[18px] bg-gray-200 outline-none border-1 border-gray-500 shadow-xl"
                      placeholder="Type in German"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleCheck(step.translate);
                        }
                      }}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setUserText(e.target.value)
                      }
                      value={userText}
                    />
                  </div>
                  {!isWrong && !isCorrect && (
                    <div className="flex justify-between mt-[75px]">
                      <button className="p-4 bg-gray-400 w-[150px] rounded-md shadow-xl">
                        SKIP
                      </button>
                      <button
                        onClick={() => handleCheck(step.translate)}
                        className="p-4 bg-[] hover:bg-[#61E002] duration-300 transition-all w-[150px] rounded-md shadow-xl"
                        style={{
                          background: userText ? "#58CC02" : "gray",
                        }}
                      >
                        CHECK
                      </button>
                    </div>
                  )}
                </>
              );
            }
          })}
        </div>
      </div>
      {isWrong && (
        <div className="absolute bottom-0 left-0 w-full h-[150px] bg-[#FFDFE0] text-[#EA2B2B]">
          <div className="max-w-[960px] mx-auto flex justify-between items-center mt-10">
            <div className="flex items-center gap-5">
              <Image
                src="https://d35aaqx5ub95lt.cloudfront.net/images/9a4bf74a74e801ca35402f2c2837e24c.svg"
                width={50}
                height={50}
                alt="Wrong"
              />
              <div className="flex flex-col">
                <h2 className="text-[24px] font-bold">Correct solution:</h2>
                <p className="text-[18px]">Привет</p>
              </div>
            </div>

            <button
              onClick={handleContinue}
              className="uppercase p-4 text-white bg-[#EA2B2B] hover:bg-red duration-300 transition-all w-[150px] rounded-md shadow-xl"
            >
              Continue:
            </button>
          </div>
        </div>
      )}
      {isCorrect && (
        <div className="absolute bottom-0 left-0 w-full h-[150px] bg-[#D7FFB8] text-[#58A700]">
          <div className="max-w-[960px] mx-auto flex justify-between items-center mt-10">
            <div className="flex flex-col">
              <h2 className="text-[32px] font-bold">Nice!</h2>
            </div>

            <button
              onClick={handleContinue}
              className="uppercase p-4 text-white bg-[#58CC02] hover:bg-[#61E002] duration-300 transition-all w-[150px] rounded-md shadow-xl"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PracticePage;