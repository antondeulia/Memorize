"use client";

import { generateRandomSentence } from "@/utils";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";

type Step = {
  translate: string;
};

const steps: Step[] = [
  {
    translate: "First step",
  },
];

const PracticePage = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const continueRef = useRef<HTMLButtonElement | null>(null);

  // Main
  const [currentStep, setCurrentStep] = useState(0);
  const [userText, setUserText] = useState("");

  // State after checking
  const [isWrong, setIsWrong] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Configurations
  const [config, setConfig] = useState<{
    level: string | null;
    topic: string | null;
    tense: string | null;
    minLength: number;
    maxLength: number;
  }>({
    level: null,
    topic: null,
    tense: null,
    minLength: 3,
    maxLength: 10,
  });

  const handleConfigChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setConfig((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheck = async (text: string) => {
    continueRef.current?.focus();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/practice`, {
      method: "POST",
    });

    const data = await res.json();

    steps.push({
      translate: data.content,
    });

    // Текст для перевода: ${text};
    // Перевод пользователя: ${userText};

    const message = `
      Проверь текст на правильность значения, правильность граматики, но при этом допустимо использовать синонимы и мелкие опечатки.
      
      Текст для перевода: Hello, would you like to order coffe or tee?;
      Перевод пользователя: Привет, вы бы хотели заказать коффе или чай?;
      
      Если перевод правильный, верни одобрение и рекомендации.
      Если перевод неверный, верни отказ и опиши в чем причина.
    `;

    // const res = await fetch("http://localhost:4200", {
    //   method: "POST",
    // });

    // TODO: send prompt to AI:
    // Is this a correct translation? original text: ${text}; user text: ${userText}. Return true if yes, no (and reasons) if no;
    // if (res.message.startsWith)... (Depends on response)

    if (text === userText) {
      setIsCorrect(true);
    } else {
      setIsWrong(true);
    }
  };

  useEffect(() => {}, []);

  const handleContinue = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/practice`, {
      method: "POST",
    });

    const data = await res.json();

    steps.push({
      translate: data.content,
    });

    setUserText("");
    setCurrentStep((prev) => ++prev);
    setIsWrong(false);
    setIsCorrect(false);

    console.log(data);

    setTimeout(() => {
      textareaRef?.current?.focus();
    }, 0);
  };

  return (
    <>
      <div className="container flex justify-center items-center h-screen">
        <div className="h-[90%] w-[90%]">
          <div className="mt-10 flex gap-10 text-black">
            <select
              name="level"
              id="level"
              className="w-[75px]"
              onChange={handleConfigChange}
              value={config.level ? config.level : "none"}
            >
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
            </select>

            <div className="flex gap-3">
              <input className="w-[50px]" type="text" placeholder="min" />
              <input className="w-[50px]" type="text" placeholder="max" />
            </div>

            <select
              name="topic"
              id="topic"
              onChange={handleConfigChange}
              value={config.topic ? config.topic : "none"}
            >
              <option value="A1">School</option>
              <option value="A2">Family</option>
              <option value="B1">Relationships</option>
              <option value="B2">Work</option>
            </select>

            <select
              name="tense"
              id="tense"
              onChange={handleConfigChange}
              value={config.tense ? config.tense : "none"}
            >
              <option value="A1">Past Simple</option>
              <option value="A2">Past Feature</option>
              <option value="B1">Past Continius</option>
              <option value="B2">Feature</option>
            </select>
          </div>

          {steps.map((step, index) => {
            if (currentStep === index) {
              return (
                <>
                  <div className="w-[75%] mx-auto mt-[85px]" key={index}>
                    <p className="overflow-y-auto max-w-full max-h-[150px] bg-white text-black p-3 px-8 rounded-2xl border-2 border-gray-400 w-max text-[18px] cursor-default">
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
                <p className="text-[18px]">{"$text"}</p>
              </div>
            </div>

            <button
              ref={continueRef}
              onClick={handleContinue}
              className="outline-none uppercase p-4 text-white bg-[#EA2B2B] hover:bg-red duration-300 transition-all w-[150px] rounded-md shadow-xl active:scale-95"
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
              ref={continueRef}
              onClick={handleContinue}
              className="outline-none uppercase p-4 text-white bg-[#58CC02] hover:bg-[#61E002] duration-300 transition-all w-[150px] rounded-md shadow-xl active:scale-95"
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
