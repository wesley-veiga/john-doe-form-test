import { useState, useRef, useEffect } from "react";
import type { RainbowColor } from "shared";
import { RAINBOW_COLORS } from "shared";

const COLOR_HEX: Record<RainbowColor, string> = {
  vermelho: "#ef4444",
  laranja: "#f97316",
  amarelo: "#eab308",
  verde: "#22c55e",
  azul: "#3b82f6",
  anil: "#6366f1",
  violeta: "#a855f7",
};

type Props = {
  label: string;
  value: RainbowColor | "";
  onChange: (value: RainbowColor) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
};

export const ColorSelectInput = ({ label, value, onChange, onBlur, error, disabled }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        onBlur?.();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onBlur]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      onBlur?.();
    }
  };

  const selectedColor = value as RainbowColor | "";
  const selectedLabel = selectedColor
    ? selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)
    : null;

  return (
    <div className="flex flex-col gap-1" onKeyDown={handleKeyDown}>
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <div className="relative" ref={wrapperRef}>
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen((o) => !o)}
          className="w-full flex items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <span className="flex items-center gap-2">
            {selectedColor && (
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: COLOR_HEX[selectedColor] }}
              />
            )}
            <span className={selectedColor ? "text-gray-900" : "text-gray-400"}>
              {selectedLabel ?? "Selecione uma cor"}
            </span>
          </span>

          <svg
            className={`w-4 h-4 text-gray-400 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
            {RAINBOW_COLORS.map((color) => {
              const isSelected = value === color;
              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => {
                    onChange(color);
                    setIsOpen(false);
                    onBlur?.();
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors ${
                    isSelected
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: COLOR_HEX[color] }}
                  />
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                  {isSelected && <span className="ml-auto text-blue-600">✓</span>}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};
