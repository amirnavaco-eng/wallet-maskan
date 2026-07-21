"use client";

import * as React from "react";

interface OtpInputProps {
  code: string[];
  onChangeDigit: (index: number, digit: string) => void;
  length: number;
  hasError?: boolean;
  disabled?: boolean;
}

export function OtpInput({
  code,
  onChangeDigit,
  length,
  hasError,
  disabled,
}: OtpInputProps) {
  const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);

  React.useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (index: number, rawValue: string) => {
    const digit = rawValue.replace(/\D/g, "").slice(-1);
    onChangeDigit(index, digit);
    if (digit && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);
    if (!pasted) return;
    e.preventDefault();
    pasted.split("").forEach((digit, i) => onChangeDigit(i, digit));
    inputsRef.current[Math.min(pasted.length, length - 1)]?.focus();
  };

  return (
    <div className="flex justify-center gap-3" dir="ltr">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          value={code[index] ?? ""}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          inputMode="numeric"
          maxLength={1}
          aria-label={`رقم ${index + 1} کد تایید`}
          className={`h-14 w-11 rounded-2xl border-2 bg-white text-center text-xl font-bold text-ink-900 outline-none transition-colors focus:border-brand-500 disabled:opacity-60 ${
            hasError ? "border-danger" : "border-surface-border"
          }`}
        />
      ))}
    </div>
  );
}
