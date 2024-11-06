"use client";

import { cn } from "@/utils/cn";
import { ReactNode, useState, KeyboardEvent } from "react";

type ButtonProps = {
  handleClick: any;
  className?: string;
  children: ReactNode;
};

const Button = ({ handleClick, className = "", children }: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      setIsPressed(true);
    }
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      setIsPressed(false);
      handleClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "p-4 duration-300 transition-all w-[150px] rounded-md shadow-xl active:scale-95",
        className,
        isPressed ? "scale-95" : ""
      )}
      onMouseUp={() => setIsPressed(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseLeave={() => setIsPressed(false)}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    >
      {children}
    </button>
  );
};

export default Button;
