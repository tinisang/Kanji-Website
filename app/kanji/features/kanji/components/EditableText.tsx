"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  defaultValue: string;
  className?: string;
  placeholder?: string;
  onSave?: (value: string) => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export function EditableText({
  defaultValue,
  className = "",
  placeholder,
  onSave,
  onFocus,
  onBlur,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

useEffect(() => {
  if (editing && inputRef.current) {
    inputRef.current.focus();

    const length = inputRef.current.value.length;
    inputRef.current.setSelectionRange(length, length);
  }
}, [editing]);

  const finishEdit = () => {
    setEditing(false);

    if (value !== defaultValue) {
      onSave?.(value);
    }
  };

  return (
    <div className="relative inline-block align-baseline">
      {/* Placeholder giữ layout */}
      <span
        className={`
          ${editing ? "invisible" : ""}
          ${className}
          ${!value ? "italic text-neutral-400 opacity-60" : ""}
        `}
        onClick={() => setEditing(true)}
      >
        {value || placeholder}
      </span>

      {editing && (
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={(e) => {
            onBlur?.(e);
            finishEdit();
          }}
          onFocus={onFocus}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              finishEdit();
            }

            if (e.key === "Escape") {
              setValue(defaultValue);
              setEditing(false);
            }
          }}
          className={`
            absolute inset-0

            w-full h-full

            border-0
            bg-transparent
            outline-none

            p-0 m-0

            font-inherit
            text-inherit
            leading-inherit
            tracking-inherit

            shadow-none
            ring-0
            focus:ring-0
            focus-visible:ring-0

            ${className}
          `}
        />
      )}
    </div>
  );
}