"use client";

import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useRef, useState } from "react";

type Step = {
  translate: string;
};

const PracticePage = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const continueRef = useRef<HTMLButtonElement | null>(null);

  // Main
  const [currentStep, setCurrentStep] = useState(0);
  const [userText, setUserText] = useState("");
  const [steps, setSteps] = useState<Step[]>([
    {
      translate: "Let's start!",
    },
  ]);

  // Loadings
  const [isChecking, setIsChecking] = useState(false);
  const [isContinueLoading, setIsContinueLoading] = useState(false);

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
    level: "",
    topic: "",
    tense: "",
    minLength: 3,
    maxLength: 10,
  });

  const handleConfigChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setConfig((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchSentences = async () => {
      const body = {
        levels: [config.level],
        topics: [config.topic],
        tenses: [config.tense],
        minLength: config.minLength,
        maxLength: config.maxLength,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/practice`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await res.json();

      setSteps(
        data.content.map((content: string) => ({
          translate: content.replace(/^"|"$/g, ""),
        }))
      );
    };

    fetchSentences();
  }, [config]);

  const handleCheck = async (text: string) => {
    setIsChecking(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/practice/check`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          userText,
        }),
      }
    );

    const data: { content: string } = await res.json();

    if (data.content.startsWith("true")) {
      setIsCorrect(true);
      setIsWrong(false);
      setTimeout(() => {
        continueRef.current?.focus();
      }, 10);
    } else {
      setIsWrong(true);
      setIsCorrect(false);
      setTimeout(() => {
        continueRef.current?.focus();
      }, 10);
    }

    setIsChecking(false);
  };

  const handleContinue = async () => {
    setIsContinueLoading(true);

    const body = {
      levels: [config.level],
      topics: [config.topic],
      tenses: [config.tense],
      minLength: Number(config.minLength),
      maxLength: Number(config.maxLength),
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/practice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    steps.push({
      translate: data.content.replace(/^"|"$/g, ""),
    });

    reset();

    setTimeout(() => {
      textareaRef?.current?.focus();
    }, 10);
    setIsContinueLoading(false);
  };

  const reset = () => {
    setUserText("");
    setCurrentStep((prev) => ++prev);
    setIsWrong(false);
    setIsCorrect(false);
  };

  return (
    <>
      <div className="container flex justify-center items-center h-screen">
        <Link
          href="/"
          className="absolute top-10 left-[250px] text-2xl bg-gray-700 px-4 cursor-pointer "
        >
          x
        </Link>
        <div className="h-[90%] w-[90%]">
          <div className="mt-10 flex gap-10 text-black">
            <select
              name="level"
              id="level"
              className="w-[75px]"
              onChange={handleConfigChange}
              value={config.level ? config.level : "none"}
            >
              <option value="Any">Any</option>
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
            </select>

            <div className="flex gap-3">
              <input
                className="w-[50px]"
                type="text"
                placeholder="min"
                name="minLength"
                onChange={handleConfigChange}
                value={config.minLength}
              />
              <input
                className="w-[50px]"
                type="text"
                placeholder="max"
                name="maxLength"
                onChange={handleConfigChange}
                value={config.maxLength}
              />
            </div>

            <select
              name="topic"
              id="topic"
              onChange={handleConfigChange}
              value={config.topic ? config.topic : "none"}
            >
              <option value="Any">Any</option>
              <option value="School">School</option>
              <option value="Family">Family</option>
              <option value="Relationships">Relationships</option>
              <option value="Work">Work</option>
            </select>

            <select
              name="tense"
              id="tense"
              onChange={handleConfigChange}
              value={config.tense ? config.tense : "none"}
            >
              <option value="Any">Any</option>
              <option value="Past Simple">Past Simple</option>
              <option value="Past feature">Past Feature</option>
              <option value="Past continius">Past Continius</option>
              <option value="Feature">Feature</option>
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
                      <button className="p-4 bg-gray-400 w-[150px] rounded-md shadow-xl active:scale-95">
                        SKIP
                      </button>
                      <button
                        onClick={() => handleCheck(step.translate)}
                        className="p-4 duration-300 transition-all w-[150px] rounded-md shadow-lg active:scale-95 active:shadow-sm outline-none uppercase"
                        style={{
                          background: "#58CC02",
                          boxShadow: "0px 6px 0px #3b8801",
                          transform: "translateY(-2px)",
                        }}
                        onMouseDown={(e) =>
                          (e.currentTarget.style.transform = "translateY(2px)")
                        }
                        onMouseUp={(e) =>
                          (e.currentTarget.style.transform = "translateY(-2px)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = "translateY(-2px)")
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            e.currentTarget.style.transform = "translateY(2px)";
                          }
                        }}
                        onKeyUp={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.currentTarget.style.transform =
                              "translateY(-2px)";
                            handleCheck(step.translate);
                          }
                        }}
                      >
                        {isChecking ? "checking..." : "check"}
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
              {isContinueLoading ? "Loading..." : "Continue"}
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
              {isContinueLoading ? "Loading..." : "Continue"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PracticePage;
