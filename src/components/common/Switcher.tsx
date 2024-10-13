import React from "react";

export default function ToggleButtons({alignment, onToggle}:{
  alignment: 'and' | 'or',
  onToggle: (alignment: 'and' | 'or') => void
}) {
  const [activeButton, setActiveButton] = React.useState(alignment);

  const toggleButton = (button: "and" | "or") => {
    setActiveButton(button);
    onToggle(button);
  };

  return (
    <div className="flex mb-3">
      <button
        onClick={() => toggleButton("and")}
        className={`px-4 py-2 rounded-l-md border text-white uppercase font-semibold text-xs ${
          activeButton === "and"
            ? "bg-purple  border-purple"
            : "bg-slate border-outline"
        }`}
      >
        and
      </button>
      <button
        onClick={() => toggleButton("or")}
        className={`px-4 py-2 rounded-r-md border text-white uppercase font-semibold text-xs ${
          activeButton === "or"
            ? "bg-purple   border-purple"
            : "bg-slate border-outline"
        }`}
      >
        or
      </button>
    </div>
  );
}
