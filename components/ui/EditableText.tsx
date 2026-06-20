import { Input } from "@/components/ui/input";
import { useState } from "react";

export function EditableText({
  defaultValue,
  className = "",
  onSave,
}: {
  defaultValue: string;
  className?: string;
  onSave?: (value: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const handleSave = () => {
    setEditing(false);
    onSave?.(value);
  };

  if (editing) {
    return (
      <input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSave();
          }
        }}
        className={className}
      />
    );
  }

  return (
    <span
      onClick={() => setEditing(true)}
      className={className}
    >
      {value}
    </span>
  );
}