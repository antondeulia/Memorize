"use client";

import { cn } from "@/utils/cn";

type ButtonProps = {
  ref?: any;
  text: string;
  isLoading?: boolean;
  style?: any;
  className?: string;
  handleClick: () => void;
  handleMouseDown?: (e: any) => void;
  handleMouseUp?: (e: any) => void;
  handleMouseLeave?: (e: any) => void;
  handleKeyDown?: (e: any) => void;
  handleKeyUp?: (e: any) => void;
};

const Button = ({
  ref,
  text,
  isLoading,
  style,
  className,
  handleClick,
  handleMouseDown,
  handleMouseUp,
  handleMouseLeave,
  handleKeyDown,
  handleKeyUp,
}: ButtonProps) => {
  return (
    <button
      ref={ref}
      disabled={isLoading}
      className={cn(
        "py-4 duration-300 transition-all w-[175px] rounded-[25px] text-[16px] active:scale-95 outline-none uppercase font-bold",
        className || ""
      )}
      style={style}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    >
      {isLoading ? "loading..." : text}
    </button>
  );
};

export default Button;
