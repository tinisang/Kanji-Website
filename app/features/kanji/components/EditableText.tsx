import { Input } from "@/components/ui/input";
import { useState } from "react";
export function EditableText({
  defaultValue,
  className = "",
  onSave,
  onFocus,
  onBlur,
  placeholder,
}: {
  defaultValue: string;
  className?: string;
  onSave?: (value: string) => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const handleSave = () => {
    setEditing(false);
    onSave?.(value);
  };

  const baseClass = `
inline-block
w-auto
min-w-0

border-0
bg-transparent
outline-none

p-0
m-0

font-inherit
text-inherit
leading-inherit

shadow-none
ring-0
focus:ring-0
focus-visible:ring-0

${className}
`;

  if (editing) {
    return (
      <input
  autoFocus
  size={Math.max(value.length, 1)}
  value={value}
  onChange={(e) => setValue(e.target.value)}
  onBlur={handleSave}
  onFocus={onFocus}
  placeholder={placeholder}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  }}
  className={baseClass}
/>
    );
  }

  return (
    <span
  onClick={() => setEditing(true)}
  className={`${baseClass} cursor-text ${
    !value
      ? "italic text-neutral-400 opacity-60"
      : ""
  }`}
>
  {value || placeholder}
</span>
  );
}