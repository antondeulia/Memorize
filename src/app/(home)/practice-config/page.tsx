"use client";

import ConfigInputRange from "@/components/ConfigInputRange";
import Button from "@/components/ui/Button";
import {
  langLevelOptions,
  lengthOptions,
} from "@/constants/practiceConfigOptions";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PracticeConfig = () => {
  const router = useRouter();

  return (
    <div className="w-[55%] p-8 px-16 mt-6">
      <div className="flex flex-col gap-2 items-center justify-center">
        <Image src="/images/lang.svg" alt="Practice" width={150} height={150} />
        <h2 className="text-2xl font-bold mt-4">Practice Mode</h2>
        <p className="text-xl text-gray-400">
          Upgrade your vocabualary by practice
        </p>
        <Button
          text="start +20 xp"
          handleClick={() => router.push("/practice")}
          className="bg-[#1CB0F6] text-white py-[14px] border-[#208cbe] border-b-[6px] w-[70%] mt-6"
        />
      </div>

      <div className="w-full h-[2px] bg-gray-200 mt-12" />

      <div className="mt-8">
        <h3 className="text-center font-semibold text-[20px]">Configuration</h3>
      </div>

      <div className="grid grid-cols-2 gap-[75px] mt-10">
        <ConfigInputRange
          label="Level"
          name="levels"
          configOptions={langLevelOptions}
        />
        <ConfigInputRange
          label="Length"
          name="length"
          configOptions={lengthOptions}
        />
      </div>
    </div>
  );
};

export default PracticeConfig;
