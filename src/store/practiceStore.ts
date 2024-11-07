"use client";

import {
  PRACTICE_CHECK_URL,
  PRACTICE_POST_URL,
} from "@/constants/practiceRoutes";
import { IPracticeStep } from "@/types";
import { PracticeContentRes } from "@/types/responses";
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
  addStep: () => Promise<void>;
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
  isContinueLoading: boolean;
  handleContinue: () => void;

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
        text: steps[steps.length - 2].text,
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

  isContinueLoading: false,
  addStep: async () => {
    const { config } = usePracticeStore.getState();
    try {
      const { data } = await axios.post<PracticeContentRes>(
        PRACTICE_POST_URL,
        config
      );
      const content = data.content.split(" | ");
      set((state) => ({
        steps: [...state.steps, { text: content[0], translation: content[1] }],
      }));
    } catch (error) {
      console.error("Error fetching practice content:", error);
    }
  },

  handleContinue: async () => {
    set({ isContinueLoading: true });
    const { setCurrentStep, currentStep, reset, addStep } =
      usePracticeStore.getState();

    setCurrentStep(currentStep + 1);
    reset();

    try {
      await addStep();
    } catch (error) {
      console.error("Error in handleContinue:", error);
    } finally {
      set({ isContinueLoading: false });
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
