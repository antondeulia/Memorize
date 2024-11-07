"use client";

import axios from "axios";
import Image from "next/image";
import { Ref, useEffect, useRef, useState } from "react";

import { PRACTICE_POST_URL } from "@/constants/practiceRoutes";
import { usePracticeStore } from "@/store/practiceStore";
import { PracticeContentRes } from "@/types/responses";
import Button from "../ui/Button";

type PracticeContinueProps = {
  icon: string;
  alt: string;
  text: string;
  color: string;
  bgColor: string;
  btnStyle: object;
};

const PracticeContinue = ({
  icon,
  alt,
  text,
  color,
  bgColor,
  btnStyle,
}: PracticeContinueProps) => {
  const { handleContinue, isContinueLoading } = usePracticeStore();
  const continueRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    continueRef?.current?.focus();
  }, []);

  return (
    <div
      className="absolute bottom-0 left-0 w-full h-[150px]"
      style={{
        backgroundColor: bgColor,
      }}
    >
      <div className="max-w-[960px] mx-auto flex justify-between items-center mt-10">
        <div className="flex items-center gap-5">
          <Image src={icon} width={65} height={65} alt={alt} />
          <div
            className="flex flex-col gap-2"
            style={{
              color,
            }}
          >
            <h2 className="text-[24px] font-bold">{text}</h2>
            {/* TODO: Display better translation*/}
            {/* <p className="text-[18px]">{"$text"}</p> */}
          </div>
        </div>

        <Button
          ref={continueRef}
          text="Continue"
          isLoading={isContinueLoading}
          handleClick={handleContinue}
          className="py-4 font-bold text-white"
          style={btnStyle}
        />
      </div>
    </div>
  );
};

export default PracticeContinue;
