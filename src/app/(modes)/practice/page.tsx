"use client";

import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useRef, useState } from "react";
import { Howl } from "howler";

type Step = {
  text: string;
  translation: string;
};

const PracticePage = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const continueRef = useRef<HTMLButtonElement | null>(null);

  // Main
  const [currentStep, setCurrentStep] = useState(0);
  const [userText, setUserText] = useState("");
  const [steps, setSteps] = useState<Step[]>([
    {
      text: "Let's start!",
      translation: "Давай начнём!",
    },
  ]);
  const [isTranslationShown, setIsTranslationShown] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  // Loadings
  const [isChecking, setIsChecking] = useState(false);
  const [isContinueLoading, setIsContinueLoading] = useState(false);

  // State after checking
  const [isWrong, setIsWrong] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Configurations
  const [config, setConfig] = useState<{
    lang: string;
    level: string | null;
    topic: string | null;
    tense: string | null;
    minLength: number;
    maxLength: number;
  }>({
    lang: "English",
    level: "",
    topic: "",
    tense: "",
    minLength: 3,
    maxLength: 10,
  });

  // Statistics
  const [stats, setStats] = useState<{
    total: number;
    correct: number;
    wrong: number;
  }>({
    total: 0,
    correct: 0,
    wrong: 0,
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

    if (data.content.toLowerCase().startsWith("true")) {
      successSound.play();

      setIsCorrect(true);

      setStats((prev) => ({
        ...prev,
        total: ++prev.total,
        correct: ++prev.correct,
      }));

      setTimeout(() => {
        continueRef.current?.focus();
      }, 10);
    } else {
      falseSound.play();

      setIsWrong(true);

      setStats((prev) => ({
        ...prev,
        total: prev.total + 1,
        wrong: prev.wrong + 1,
      }));

      setTimeout(() => {
        continueRef.current?.focus();
      }, 10);
    }

    setIsChecking(false);
  };

  const handleContinue = async () => {
    setIsContinueLoading(true);

    const body = {
      lang: config.lang,
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

    const content = data.content.split(" | ");

    steps.push({
      text: content[0],
      translation: content[1],
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

  const successSound = new Howl({
    src: "/success.mp3",
    volume: 0.5,
  });

  const falseSound = new Howl({
    src: "/error.mp3",
    volume: 0.5,
  });

  return (
    <>
      <div className="container flex justify-center items-center h-screen">
        <Link
          href="/"
          className="absolute top-10 left-[250px] text-2xl text-[38px] text-gray-400 px-4 cursor-pointer "
        >
          {"<-"}
        </Link>
        <div
          onClick={() => setShowConfig((prev) => !prev)}
          className="absolute top-10 right-[250px] text-2xl text-[38px] text-gray-400 px-4 cursor-pointer "
        >
          @
        </div>
        <div className="h-[90%] w-[90%]">
          {!showConfig ? (
            <div className="py-4 px-4 bg-[#636363] shadow-xl mt-1 flex flex-wrap gap-10">
              <select
                name="level"
                id="level"
                className="border border-black py-1 px-4"
                onChange={handleConfigChange}
              >
                <option value="Any">Any</option>
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="С1">С1</option>
                <option value="С2">С2</option>
              </select>

              <div className="flex gap-3">
                <input
                  className="w-[50px] border border-black px-4"
                  type="text"
                  placeholder="min"
                  name="minLength"
                  onChange={handleConfigChange}
                  value={config.minLength}
                />
                <input
                  className="w-[50px] border border-black px-4"
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
                className="border border-black px-4"
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
                className="border border-black px-4"
              >
                <option value="Any">Any</option>
                <option value="Past Simple">Past Simple</option>
                <option value="Past feature">Past Feature</option>
                <option value="Past continius">Past Continius</option>
                <option value="Feature">Feature</option>
              </select>

              <select
                name="lang"
                id="lang"
                onChange={handleConfigChange}
                className='border border-black px-4"'
              >
                <option value="English">English</option>
                <option value="Sweden">Svergies</option>
                <option value="Russian">Русский</option>
                <option value="Ukrainian">Українська</option>
                <option value="German">Deutschland</option>
              </select>
            </div>
          ) : (
            <div className="text-2xl text-center">
              {stats.total}: {stats.wrong} | {stats.correct}
            </div>
          )}

          {steps.map((step, index) => {
            if (currentStep === index) {
              return (
                <>
                  <div className="w-[75%] mx-auto mt-[100px]" key={index}>
                    <div className="relative">
                      {isTranslationShown && (
                        <p className="absolute bg-gray-200 border-1 border-black top-[60px] left-4 rounded-md py-2 px-4">
                          {step.translation}
                        </p>
                      )}
                      <p
                        onMouseMove={() => setIsTranslationShown(true)}
                        onMouseLeave={() => setIsTranslationShown(false)}
                        className="overflow-y-auto max-w-full max-h-[150px] bg-white p-3 px-8 rounded-2xl border-2 border-gray-400 w-max text-[18px] cursor-default"
                      >
                        {step.text}
                      </p>
                    </div>
                    <textarea
                      ref={textareaRef}
                      className="resize-none block mt-[60px] w-[100%] h-[180px] rounded-xl p-4 text-[18px] bg-gray-200 outline-none border-1 border-gray-500 shadow-xl"
                      placeholder="Type in German"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleCheck(step.text);
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
                      <button className="p-4 bg-gray-400 text-white w-[150px] rounded-md shadow-xl active:scale-95">
                        SKIP
                      </button>
                      <button
                        disabled={isChecking}
                        onClick={() => handleCheck(step.translation)}
                        className="text-white p-4 duration-300 transition-all w-[150px] rounded-md shadow-lg active:scale-95 active:shadow-sm outline-none uppercase"
                        style={{
                          background: userText ? "#58CC02" : "gray",
                          boxShadow: userText && "0px 6px 0px #3b8801",
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
                            handleCheck(step.translation);
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
              disabled={isContinueLoading}
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
              disabled={isContinueLoading}
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
