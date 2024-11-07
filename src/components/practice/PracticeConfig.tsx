"use client";

import {
  langLevelOptions,
  langOptions,
  tenseOptions,
  topicOptions,
} from "@/constants/dropdowns";
import Dropdown from "../ui/Dropdown";
import { ChangeEvent } from "react";
import { usePracticeStore } from "@/store/practiceStore";

const PracticeConfig = () => {
  const { config, setConfig } = usePracticeStore();

  const handleConfigChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setConfig(name, value);
  };

  return (
    <div className="py-4 px-4 bg-[#636363] shadow-xl mt-1 flex flex-wrap gap-10">
      <Dropdown
        name="level"
        handleChange={handleConfigChange}
        options={langLevelOptions}
      />
      <Dropdown
        name="topic"
        handleChange={handleConfigChange}
        options={topicOptions}
      />
      <Dropdown
        name="tense"
        handleChange={handleConfigChange}
        options={tenseOptions}
      />
      <Dropdown
        name="lang"
        handleChange={handleConfigChange}
        options={langOptions}
      />
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
    </div>
  );
};

export default PracticeConfig;
