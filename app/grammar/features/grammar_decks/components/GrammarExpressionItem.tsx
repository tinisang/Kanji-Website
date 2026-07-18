"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { GrammarExpression } from "@/app/grammar/lib/types/GrammarExpression";


import { EditableText } from "@/app/kanji/features/kanji/components/EditableText";
import TiptapEditor from "@/app/kanji/features/kanji/components/TipTapEditor";
import { GrammarExpressionExample } from "@/app/grammar/lib/types/GrammarExpressionExample ";
import GrammarExpressionExamples from "./GrammarExpressionExamples";

interface Props {
  expression: GrammarExpression;
  examples: Record<
    string,
    GrammarExpressionExample
  >;
}

export default function GrammarExpressionItem({
  expression,
  examples,
}: Props) {
  const [editingPattern, setEditingPattern] =
    useState(false);

  const [pattern, setPattern] = useState(
    expression.pattern ?? ""
  );

  return (
    <div className="grid grid-cols-[1fr_1fr_1.5fr] gap-8 border border-green-200 bg-[#D9FFD6] border-l-6 border-l-[#49FF38]" >
      <div className="p-5 bg-[#EBFFE9]">
        <EditableText
          defaultValue={expression.label ?? ""}
          placeholder="Label"
          className="inline-flex rounded text-sm font-semibold "
        />
        <div className="mt-2">

        <EditableText
            defaultValue={expression.note ?? ""}
            placeholder="Note"
            className="text-gray-600"
            />
            </div>
      </div>

      <div className="p-5">
        {editingPattern ? (
          <>
            <TiptapEditor
              value={pattern}
              onChange={setPattern}
            />

            <div className="mt-3 flex justify-end gap-2">
              <Button
                variant="outline"
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
                onClick={async () => {
                  // await update...

                  setEditingPattern(false);
                }}
              >
                Save
              </Button>
            </div>
          </>
        ) : (
          <div
            onClick={() =>
              setEditingPattern(true)
            }
            className="prose max-w-none min-h-[40px] cursor-text rounded p-2 hover:bg-green-100"
            dangerouslySetInnerHTML={{
              __html:
                pattern ||
                "<p class='text-gray-400'>Pattern</p>",
            }}
          />
        )}
      </div>

      <div>

       
        <div className=" space-y p-5">
          <GrammarExpressionExamples
          expression = {expression}
  examples={examples}
/>
        </div>
      </div>
    </div>
  );
}