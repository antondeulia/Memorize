import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { PracticeConfigOption } from "@/constants/practiceConfigOptions";

type ConfigInputRangeProps = {
  label: string;
  name: string;
  configOptions: PracticeConfigOption[];
};

const ConfigInputRange = ({
  label,
  name,
  configOptions,
}: ConfigInputRangeProps) => {
  const [level, setLevel] = useState(0);

  const handleChange = (value: any) => {
    setLevel(value);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between mb-2 text-sm text-gray-700">
        {configOptions.map((option) => (
          <span key={option.label}>{option.label}</span>
        ))}
      </div>

      <Slider
        min={0}
        max={configOptions.length - 1}
        step={1}
        value={level}
        onChange={handleChange}
        trackStyle={{
          height: 20,
        }}
        railStyle={{
          height: 20,
        }}
        handleStyle={{
          height: 30,
          width: 30,
        }}
        className="p-4 w-full"
      />

      <div className="mt-6">
        <span className="text-gray-500 text-sm">{label}: </span>
        {configOptions[level].label}
      </div>
    </div>
  );
};

export default ConfigInputRange;
