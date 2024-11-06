import { sentences } from "@/words";

export const generateRandomSentence = (wordCount: number) => {
  let sentence = "";
  for (let i = 0; i < wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * sentences.length);
    sentence += (i === 0 ? "" : " ") + sentences[randomIndex];
  }

  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
};
