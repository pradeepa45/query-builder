import React from "react";
import { TbCaretDownFilled } from "react-icons/tb";
import { clsx } from "clsx";

export default function Select({
  label,
  name,
  options,
  onChange,
  value,
}: {
  label: string;
  name: string;
  options: string[];
  onChange: (name: string, option: string) => void;
  value?: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(value);
  const dropdownRef = React.useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    setSelectedValue(option);
    onChange(name, option);
    setIsOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef?.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <p className="capitalize text-xs mb-2 font-medium">{name}</p>
      <button
        onClick={toggleDropdown}
        className={clsx(
          "px-3 py-2 bg-white bg-opacity-5 border border-slate rounded w-full inline-flex items-center justify-between min-h-9",
          selectedValue ? "text-white" : "text-grey"
        )}
      >
        {selectedValue ? selectedValue : label}
        <TbCaretDownFilled />
      </button>

      {isOpen && (
        <div className="absolute mt-3 bg-slate border border-outline rounded py-2 z-10 w-full">
          <div className="flex gap-1.5 flex-col items-start justify-center px-2">
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelect(option)}
                className="py-2 px-2 hover:bg-white hover:bg-opacity-10 cursor-pointer text-sm w-full"
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
