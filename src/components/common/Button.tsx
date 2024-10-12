import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant: "primary" | "grey";
  size?: "md" | "lg";
  outline?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export default function Button({
  type = "button",
  children,
  className,
  variant,
  size = "md",
  disabled,
  onClick,
  outline = false,
  startIcon,
  endIcon,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={twMerge(
        className,
        "inline-flex items-center justify-center gap-2 h-[44px]",
        variant === "primary"
          ? "bg-purple hover:bg-purple-hover border-purple hover:border-purple-hover"
          : "bg-grey hover:bg-dark",
        "flex items-center justify-center rounded-md",
        size === "md" ? "min-w-[68px]" : "min-w-[142px] font-semibold",
        outline
          ? `bg-transparent border ${
              variant === "primary" ? "border-purple" : "border-grey"
            }`
          : undefined
      )}
      disabled={disabled}
    >
      {startIcon && <span>{startIcon}</span>}
      {children}
      {endIcon && <span>{endIcon}</span>}
    </button>
  );
}
