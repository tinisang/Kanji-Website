"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { GrammarExpression } from "@/app/grammar/lib/types/GrammarExpression";
import { GrammarExpressionExample } from "@/app/grammar/lib/types/GrammarExpressionExample ";
import { Grammar } from "@/app/grammar/lib/types/Grammar";

import { EditableText } from "@/app/kanji/features/kanji/components/EditableText";
import TiptapEditor from "@/app/kanji/features/kanji/components/TipTapEditor";

import GrammarExpressionExamples from "./GrammarExpressionExamples";

import {
  deleteExpressionUI,
  updateExpressionUI,
  useGrammar,
} from "@/app/grammar/contexts/GrammarContext";

import {
  deleteGrammarExpression,
  updateGrammarExpression,
} from "../clients/grammarExpressionClient";

interface Props {
  expression: GrammarExpression;
  grammar: Grammar;
  examples: Record<string, GrammarExpressionExample>;
}

export default function GrammarExpressionItem({
  expression,
  grammar,
  examples,
}: Props) {
  const [editingPattern, setEditingPattern] =
    useState(false);

  const [pattern, setPattern] = useState(
    expression.pattern ?? ""
  );

  const { setGrammarData } = useGrammar();

  async function saveExpression(
    value: string,
    field: "label" | "note" | "pattern"
  ) {
    const updated = {
      ...expression,
      [field]: value,
    };

    updateExpressionUI(
      setGrammarData,
      updated
    );

    await updateGrammarExpression(updated);
  }

  async function deleteExpression() {
    deleteExpressionUI(
      setGrammarData,
      grammar.id,
      expression.id
    );

    await deleteGrammarExpression(
      expression.id
    );
  }

  return (
    <div
      className="
        group/expression relative
        overflow-hidden
        rounded-2xl
        border border-green-200
        bg-white
        shadow-sm
        transition-shadow
        hover:shadow-md
      "
    >
      {/* Header accent */}
      <div className="h-1 bg-[#49FF38]" />

      {/* Delete */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          deleteExpression();
        }}
        className="
          absolute right-3 top-4 z-20
          rounded-lg p-2
          text-red-500
          opacity-100
          transition
          hover:bg-red-50
          lg:opacity-0
          lg:group-hover/expression:opacity-100
        "
        aria-label="Delete expression"
      >
        <Trash2 className="h-4 w-4" />
      </button>

      <div
        className="
          grid grid-cols-1
          lg:grid-cols-[0.9fr_1.2fr_1.4fr]
        "
      >
        {/* -------------------------------------------------------------- */}
        {/* Label / Note */}
        {/* -------------------------------------------------------------- */}

        <div
          className="
            min-w-0
            border-b border-green-100
            bg-[#F3FFF1]
            p-5
            pr-12
            lg:border-b-0
            lg:border-r
          "
        >
          <div className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-green-700/60">
            Expression
          </div>

          <EditableText
            defaultValue={expression.label ?? ""}
            placeholder="Label"
            className="
              inline-flex
              max-w-full
              rounded-lg
              text-lg
              font-semibold
              text-gray-900
              sm:text-xl
            "
            onSave={(value) =>
              saveExpression(
                value,
                "label"
              )
            }
          />

          <div className="mt-3">
            <EditableText
              defaultValue={expression.note ?? ""}
              placeholder="Add note..."
              className="
                max-w-full
                break-words
                text-sm
                leading-relaxed
                text-gray-500
              "
              onSave={(value) =>
                saveExpression(
                  value,
                  "note"
                )
              }
            />
          </div>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* Pattern */}
        {/* -------------------------------------------------------------- */}

        <div
          className="
            min-w-0
            border-b border-green-100
            p-5
            lg:border-b-0
            lg:border-r
          "
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Pattern
            </span>

            {!editingPattern && (
              <button
                type="button"
                onClick={() =>
                  setEditingPattern(true)
                }
                className="
                  flex items-center gap-1.5
                  rounded-lg
                  px-2 py-1
                  text-xs
                  font-medium
                  text-gray-500
                  transition
                  hover:bg-gray-100
                  hover:text-gray-900
                "
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </button>
            )}
          </div>

          {editingPattern ? (
            <div className="space-y-3">
              <TiptapEditor
                value={pattern}
                onChange={setPattern}
              />

              <div className="flex flex-wrap justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setPattern(
                      expression.pattern ?? ""
                    );
                    setEditingPattern(false);
                  }}
                >
                  Cancel
                </Button>

                <Button
                  size="sm"
                  onClick={async () => {
                    await saveExpression(
                      pattern,
                      "pattern"
                    );

                    setEditingPattern(false);
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <div
              onClick={() =>
                setEditingPattern(true)
              }
              className="
                min-h-[60px]
                cursor-text
                rounded-xl
                border border-transparent
                bg-gray-50
                p-3
                transition
                hover:border-green-200
                hover:bg-green-50/50
              "
            >
              {pattern ? (
                <div
                  className="
                    prose
                    prose-sm
                    max-w-none
                    break-words
                    text-gray-800
                  "
                  dangerouslySetInnerHTML={{
                    __html: pattern,
                  }}
                />
              ) : (
                <span className="text-sm italic text-gray-400">
                  Click to add pattern...
                </span>
              )}
            </div>
          )}
        </div>

        {/* -------------------------------------------------------------- */}
        {/* Examples */}
        {/* -------------------------------------------------------------- */}

        <div className="min-w-0 p-5">
          <div className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Examples
          </div>

          <GrammarExpressionExamples
            expression={expression}
            examples={examples}
          />
        </div>
      </div>
    </div>
  );
}