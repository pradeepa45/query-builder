import { BaseTextFieldProps } from "@mui/material";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { ChangeEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends BaseTextFieldProps {
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  className?: string;
  value?: string;
}

export default function Input({
  value,
  name,
  onChange,
  required,
  disabled,
  className,
  placeholder,
}: InputProps) {
  return (
    <BaseTextareaAutosize
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      placeholder={placeholder}
      className={twMerge(
        className,
        "h-[44px] py-[9px] outline-none border rounded-md resize-none bg-black px-4"
      )}
    />
  );
}
