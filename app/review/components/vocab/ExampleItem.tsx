"use client";

import {
  Loader2,
  Pencil,
  Save,
  Trash2,
  X,
} from "lucide-react";

type Example = {
  id: string;
  example: string;
  meaning?: string | null;
};

type Editing =
  | { type: "expression"; id: string }
  | { type: "example"; id: string }
  | null;

interface Props {
  example: Example;
  expressionId: string;
  editing: Editing;
  saving: boolean;

  onEdit: (
    value: Editing
  ) => void;

  onDelete: (
    value: {
      type: "example";
      id: string;
      expressionId: string;
    }
  ) => void;

  onUpdate: (
    expressionId: string,
    exampleId: string,
    field: "example" | "meaning",
    value: string
  ) => void;

  onSave: (
    expressionId: string,
    exampleId: string
  ) => void;
}

export default function ExampleItem({
  example,
  expressionId,
  editing,
  saving,
  onEdit,
  onDelete,
  onUpdate,
  onSave,
}: Props) {
  const isEditing =
    editing?.type === "example" &&
    editing.id === example.id;

  return (
    <div
      className="
        border-l-2
        border-emerald-200
        pl-3
      "
    >
      {isEditing ? (
        <div className="space-y-2">
          <input
            autoFocus
            value={example.example}
            onChange={(e) =>
              onUpdate(
                expressionId,
                example.id,
                "example",
                e.target.value
              )
            }
            className="
              w-full rounded-lg
              border bg-background
              px-3 py-2
              text-xs outline-none
              focus:border-emerald-300
            "
          />

          <input
            value={example.meaning ?? ""}
            onChange={(e) =>
              onUpdate(
                expressionId,
                example.id,
                "meaning",
                e.target.value
              )
            }
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
              onClick={() =>
                onEdit(null)
              }
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
              disabled={saving}
              onClick={() =>
                onSave(
                  expressionId,
                  example.id
                )
              }
              className="
                rounded-md p-1.5
                text-emerald-600
                hover:bg-emerald-100
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
      ) : (
        <div className="flex items-start gap-1">
          <div className="min-w-0 flex-1">
            <div className="text-xs leading-relaxed sm:text-sm">
              {example.example}
            </div>

            {example.meaning && (
              <div className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                {example.meaning}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() =>
              onEdit({
                type: "example",
                id: example.id,
              })
            }
            className="
              shrink-0 rounded-md p-1
              text-muted-foreground
              hover:bg-background
              hover:text-emerald-600
            "
          >
            <Pencil className="h-3 w-3" />
          </button>

          <button
            type="button"
            onClick={() =>
              onDelete({
                type: "example",
                id: example.id,
                expressionId,
              })
            }
            className="
              shrink-0 rounded-md p-1
              text-muted-foreground
              hover:bg-rose-50
              hover:text-rose-600
            "
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
}