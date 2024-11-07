"use client";

import { useState } from "react";

type PracticeTextProps = {
  text: string;
  translation: string;
};

const PracticeText = ({ text, translation }: PracticeTextProps) => {
  const [hint, setHint] = useState<boolean>(false);

  return (
    <div className="relative">
      {hint && (
        <p className="absolute bg-[#F7F7F7] border-2 border-gray-200 top-[60px] left-4 rounded-md py-2 px-4">
          {translation}
        </p>
      )}
      <p
        onMouseMove={() => setHint(true)}
        onMouseLeave={() => setHint(false)}
        className="overflow-y-auto max-w-full max-h-[150px] p-3 px-8 rounded-2xl border-2 w-max text-[18px] cursor-default"
      >
        {text}
      </p>
    </div>
  );
};

export default PracticeText;
