"use client";

import { sentences } from "@/data/sentences";
import { ChangeEvent, FormEvent, useState } from "react";

const SequentialTranslationPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userTranslation, setUserTranslation] = useState("");
  const [translations, setTranslations] = useState<string[]>(
    Array(sentences.length).fill("")
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserTranslation(e.target.value);
  };

  const handleEnter = (e: any) => {
    if (e.key === "Enter") {
      if (
        userTranslation !==
        "Быстрая коричневая лиса прыгнула над ленивой собакой"
      ) {
      } else {
        setTranslations((prev) => {
          const newTranslations = [...prev];
          newTranslations[currentIndex] = userTranslation;
          return newTranslations;
        });
        setUserTranslation("");
        setCurrentIndex((prev) => Math.min(prev + 1, sentences.length - 1));
      }
    }
  };

  return (
    <section>
      <div className="container">
        <div className="mt-8 flex flex-col gap-10">
          <p className="text-2xl border-[4px] border-white p-4">
            {sentences.map((sentence, index) => {
              const displayText = translations[index] || sentence; // Use translation if available
              return (
                <span
                  key={index}
                  style={{
                    color:
                      index === currentIndex
                        ? "white"
                        : index < currentIndex
                        ? "green"
                        : "gray",
                  }}
                >
                  {" "}
                  {displayText}
                </span>
              );
            })}
          </p>

          <input
            className="py-2 px-4 border-[4px] text-white border-white\s bg-black resize-none"
            placeholder="Your text here..."
            onChange={handleChange}
            value={userTranslation}
            onKeyDown={handleEnter}
          />
        </div>
      </div>
    </section>
  );
};

export default SequentialTranslationPage;
