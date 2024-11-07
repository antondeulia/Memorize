"use client";

import { PRACTICE_CHECK_URL } from "@/constants/practiceRoutes";
import { IPracticeStep } from "@/types";
import { falseSound, successSound } from "@/utils/sounds";
import axios from "axios";
import { create } from "zustand";

type Config = {
  langs: string[];
  levels: string[];
  topics: string[];
  tenses: string[];
  minLength: number;
  maxLength: number;
};

type PracticeStore = {
  // General
  steps: IPracticeStep[];
  addStep: (value: IPracticeStep) => void;
  text: string;
  userText: string;
  setUserText: (value: string) => void;
  currentStep: number;
  setCurrentStep: (value: number) => void;
  isWrong: boolean;
  setIsWrong: (value: boolean) => void;
  isCorrect: boolean;
  setIsCorrect: (value: boolean) => void;
  reset: () => void;
  isChecking: boolean;
  handleCheck: () => void;

  // Config
  config: Config;
  setConfig: (name: string, value: string) => void;
  showConfig: boolean;
  setShowConfig: (value: boolean) => void;
};

export const usePracticeStore = create<PracticeStore>((set) => ({
  // General State
  steps: [
    {
      text: "Let's begin",
      translation: "Давайте начнём",
    },
  ],
  addStep: (value) =>
    set((state) => ({
      steps: [...state.steps, value],
    })),
  currentStep: 0,
  setCurrentStep: (value) => set({ currentStep: value }),
  text: "",
  userText: "",
  setUserText: (value) => set({ userText: value }),
  isWrong: false,
  setIsWrong: (value) => set({ isWrong: value }),
  isCorrect: false,
  setIsCorrect: (value) => set({ isCorrect: value }),
  reset: () =>
    set({
      userText: "",
      isWrong: false,
      isCorrect: false,
    }),
  isChecking: false,
  handleCheck: async () => {
    set((state) => ({
      ...state,
      isChecking: true,
      isCorrect: false,
      isWrong: false,
    }));

    const { steps, userText } = usePracticeStore.getState();

    try {
      const { data } = await axios.post(PRACTICE_CHECK_URL, {
        text: steps[steps.length - 1].text,
        userText,
      });

      if (data.content.toLowerCase().startsWith("true")) {
        successSound.play();
        set({ isCorrect: true });
      } else {
        falseSound.play();
        set({ isWrong: true });
      }
    } catch (error) {
      console.error("Error checking practice:", error);
    } finally {
      set({ isChecking: false });
    }
  },

  // Configs State
  config: {
    langs: ["English"],
    levels: [],
    tenses: [],
    topics: [],
    minLength: 3,
    maxLength: 7,
  },
  setConfig: (name, value) =>
    set((state) => ({
      config: {
        ...state.config,
        [name]: value,
      },
    })),
  showConfig: false,
  setShowConfig: (value) =>
    set({
      showConfig: value,
    }),
}));
