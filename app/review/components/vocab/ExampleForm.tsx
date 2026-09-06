// ExampleForm.tsx

import { Loader2, Save, X } from "lucide-react";

type NewExample = {
  example: string;
  meaning: string;
};

interface Props {
  value: NewExample;
  saving: boolean;
  onChange: (
    field: "example" | "meaning",
    value: string
  ) => void;
  onCancel: () => void;
  onSave: () => void;
}

export default function ExampleForm({
  value,
  saving,
  onChange,
  onCancel,
  onSave,
}: Props) {
  return (
    <div className="border-l-2 border-emerald-200 pl-3">
      <div className="space-y-2">
        <input
          autoFocus
          value={value.example}
          onChange={(e) =>
            onChange("example", e.target.value)
          }
          placeholder="Example"
          className="
            w-full rounded-lg
            border bg-background
            px-3 py-2
            text-xs outline-none
            focus:border-emerald-300
          "
        />

        <input
          value={value.meaning}
          onChange={(e) =>
            onChange("meaning", e.target.value)
          }
          placeholder="Meaning"
          className="
            w-full rounded-lg
            border bg-background
            px-3 py-2
            text-xs outline-none
            focus:border-emerald-300
          "
        />

        <div className="flex justify-end gap-1">
          <button
            type="button"
            disabled={saving}
            onClick={onCancel}
            className="
              rounded-md p-1.5
              text-muted-foreground
              hover:bg-background
            "
          >
            <X className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            disabled={
              saving || !value.example.trim()
            }
            onClick={onSave}
            className="
              rounded-md p-1.5
              text-emerald-600
              hover:bg-emerald-100
              disabled:opacity-50
            "
          >
            {saving ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Save className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}