"use client";

import {
  Loader2,
  Save,
  X,
} from "lucide-react";

type NewExpression = {
  word: string;
  reading: string;
  meaning: string;
};

interface Props {
  value: NewExpression;
  saving: boolean;
  onChange: (
    value: NewExpression
  ) => void;
  onCancel: () => void;
  onSave: () => void;
}

export default function ExpressionForm({
  value,
  saving,
  onChange,
  onCancel,
  onSave,
}: Props) {
  return (
    <div
      className="
        rounded-2xl
        border border-emerald-200
        bg-emerald-50/50
        p-4
      "
    >
      <div className="space-y-2">
        <input
          autoFocus
          value={value.word}
          onChange={(e) =>
            onChange({
              ...value,
              word: e.target.value,
            })
          }
          placeholder="Expression"
          className="
            w-full rounded-lg border
            bg-background px-3 py-2
            text-sm font-bold outline-none
            focus:border-emerald-300
          "
        />

        <input
          value={value.meaning}
          onChange={(e) =>
            onChange({
              ...value,
              meaning: e.target.value,
            })
          }
          placeholder="Meaning"
          className="
            w-full rounded-lg border
            bg-background px-3 py-2
            text-sm outline-none
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
            <X className="h-4 w-4" />
          </button>

          <button
            type="button"
            disabled={
              saving || !value.word.trim()
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
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}