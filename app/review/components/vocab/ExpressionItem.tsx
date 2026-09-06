"use client";

import {
  ChevronDown,
  Pencil,
  Trash2,
} from "lucide-react";

import { Usage } from "@/app/vocabulary/lib/types/Usage";
import { Vocabulary } from "@/app/kanji/types/vocabulary";
import ExampleItem from "./ExampleItem";
import ExampleForm from "./ExampleForm";



type Editing =
  | { type: "expression"; id: string }
  | { type: "example"; id: string }
  | null;

type NewExample = {
  example: string;
  meaning: string;
};

interface Props {
  usage: Usage;
  vocabulary: Vocabulary;

  isOpen: boolean;
  creatingExample: boolean;

  newExample: NewExample;

  editing: Editing;
  saving: boolean;

  onToggle: () => void;

  onEdit: (
    value: Editing
  ) => void;

  onDelete: (
    value:
      | {
          type: "expression";
          id: string;
        }
      | {
          type: "example";
          id: string;
          expressionId: string;
        }
  ) => void;

  onUpdateExpression: (
    id: string,
    field:
      | "word"
      | "reading"
      | "meaning",
    value: string
  ) => void;

  onSaveExpression: (
    usage: Usage
  ) => void;

  onUpdateExample: (
    expressionId: string,
    exampleId: string,
    field: "example" | "meaning",
    value: string
  ) => void;

  onSaveExample: (
    expressionId: string,
    exampleId: string
  ) => void;

  onOpenCreateExample: (
    expressionId: string
  ) => void;

  onCloseCreateExample: (
    expressionId: string
  ) => void;

  onUpdateNewExample: (
    expressionId: string,
    field: keyof NewExample,
    value: string
  ) => void;

  onCreateExample: (
    expressionId: string
  ) => void;
}

export default function ExpressionItem({
  usage,
  vocabulary,
  isOpen,
  creatingExample,
  newExample,
  editing,
  saving,
  onToggle,
  onEdit,
  onDelete,
  onUpdateExpression,
  onSaveExpression,
  onUpdateExample,
  onSaveExample,
  onOpenCreateExample,
  onCloseCreateExample,
  onUpdateNewExample,
  onCreateExample,
}: Props) {
  const expression =
    usage.expression.word;

  const expressionIndex =
    expression.indexOf(vocabulary.word);

  const examples = Object.values(
    usage.examples
  );

  const hasExamples =
    examples.length > 0;

  const expressionEditing =
    editing?.type === "expression" &&
    editing.id === usage.expression.id;

  return (
    <div
      className="
        rounded-2xl
        bg-emerald-50/80
        px-4 py-3
        sm:px-5 sm:py-4
      "
    >
      {expressionEditing ? (
        <div className="space-y-2">
          <input
            autoFocus
            value={
              usage.expression.word
            }
            onChange={(e) =>
              onUpdateExpression(
                usage.expression.id,
                "word",
                e.target.value
              )
            }
            className="
              w-full rounded-lg border
              bg-background px-3 py-2
              text-sm font-bold outline-none
              focus:border-emerald-300
            "
          />

          <input
            value={
              usage.expression.meaning ?? ""
            }
            onChange={(e) =>
              onUpdateExpression(
                usage.expression.id,
                "meaning",
                e.target.value
              )
            }
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
              onClick={() =>
                onEdit(null)
              }
              className="
                rounded-md p-1.5
                text-muted-foreground
                hover:bg-background
              "
            >
              <span className="text-xs">
                Cancel
              </span>
            </button>

            <button
              type="button"
              disabled={saving}
              onClick={() =>
                onSaveExpression(usage)
              }
              className="
                rounded-md px-2 py-1.5
                text-xs text-emerald-600
                hover:bg-emerald-100
              "
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-2">
          <button
  type="button"
  onClick={onToggle}
  className="
    mt-1 shrink-0
    text-muted-foreground
    hover:text-emerald-600
  "
>
  <ChevronDown
    className={`
      h-4 w-4 transition-transform
      ${isOpen ? "rotate-180" : ""}
    `}
  />
</button>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <div className="break-words text-base font-bold sm:text-lg">
                {expressionIndex === -1 ? (
                  expression
                ) : (
                  <>
                    {expression.slice(
                      0,
                      expressionIndex
                    )}

                    <span className="text-emerald-600">
                      {expression.slice(
                        expressionIndex,
                        expressionIndex +
                          vocabulary.word.length
                      )}
                    </span>

                    {expression.slice(
                      expressionIndex +
                        vocabulary.word.length
                    )}
                  </>
                )}
              </div>

              {hasExamples && (
                <span
                  className="
                    h-2 w-2 shrink-0
                    rounded-full bg-red-500
                  "
                />
              )}
            </div>

            {usage.expression.meaning && (
              <div className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
                {usage.expression.meaning}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() =>
              onEdit({
                type: "expression",
                id: usage.expression.id,
              })
            }
            className="
              shrink-0 rounded-md p-1.5
              text-muted-foreground
              hover:bg-background
              hover:text-emerald-600
            "
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={() =>
              onDelete({
                type: "expression",
                id: usage.expression.id,
              })
            }
            className="
              shrink-0 rounded-md p-1.5
              text-muted-foreground
              hover:bg-rose-50
              hover:text-rose-600
            "
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {isOpen && (
        <div
          className="
            mt-3 space-y-3
            border-t border-emerald-100
            pt-3
          "
        >
          {examples.map((example) => (
            <ExampleItem
              key={example.id}
              example={example}
              expressionId={
                usage.expression.id
              }
              editing={editing}
              saving={saving}
              onEdit={onEdit}
              onDelete={onDelete}
              onUpdate={onUpdateExample}
              onSave={onSaveExample}
            />
          ))}

          {creatingExample ? (
            // ExpressionItem.tsx

<ExampleForm
  value={newExample}
  saving={saving}
  onChange={(
    field: "example" | "meaning",
    value: string
  ) =>
    onUpdateNewExample(
      usage.expression.id,
      field,
      value
    )
  }
  onCancel={() =>
    onCloseCreateExample(
      usage.expression.id
    )
  }
  onSave={() =>
    onCreateExample(
      usage.expression.id
    )
  }
/>
          ) : (
            <button
              type="button"
              onClick={() =>
                onOpenCreateExample(
                  usage.expression.id
                )
              }
              className="
                ml-3 inline-flex
                items-center gap-1
                rounded-md px-2 py-1
                text-xs font-medium
                text-emerald-600
                hover:bg-emerald-50
              "
            >
              + Example
            </button>
          )}
        </div>
      )}
    </div>
  );
}