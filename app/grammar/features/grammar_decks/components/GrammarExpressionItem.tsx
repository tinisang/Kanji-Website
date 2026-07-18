"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { GrammarExpression } from "@/app/grammar/lib/types/GrammarExpression";


import { EditableText } from "@/app/kanji/features/kanji/components/EditableText";
import TiptapEditor from "@/app/kanji/features/kanji/components/TipTapEditor";
import { GrammarExpressionExample } from "@/app/grammar/lib/types/GrammarExpressionExample ";
import GrammarExpressionExamples from "./GrammarExpressionExamples";
import { deleteExpressionUI, updateExpressionFieldUI, updateExpressionUI, useGrammar } from "@/app/grammar/contexts/GrammarContext";
import { deleteGrammarExpression, updateGrammarExpression } from "../clients/grammarExpressionClient";
import { Trash2 } from "lucide-react";
import { Grammar } from "@/app/grammar/lib/types/Grammar";

interface Props {
  expression: GrammarExpression;
  grammar:Grammar;
  examples: Record<
    string,
    GrammarExpressionExample
  >;
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


  const {setGrammarData} = useGrammar();
    async function saveExpression(
    value: string,
    field: "label" | "note" | "pattern"
  ) {
    const updated = {
      ...expression,
      [field]: value,
    };
  
    updateExpressionUI(setGrammarData, updated)
  
    await updateGrammarExpression(updated);
  }



  return (
<div className="group/expression relative grid grid-cols-[1fr_1fr_1.5fr] gap-8 border border-green-200 bg-[#D9FFD6] border-l-6 border-l-[#49FF38]">
  <div
  role="button"
  tabIndex={0}
  onClick={async (e) => {
    e.stopPropagation();

    deleteExpressionUI(
      setGrammarData, 
      grammar.id,
      expression.id
    );
    await deleteGrammarExpression(expression.id);
  }}
  className="
    absolute
    top-3
    right-3
    rounded-md
    p-1.5
    text-red-500
    opacity-0
    transition
    hover:bg-red-100
    group-hover/expression:opacity-100
    z-20
  "
>
  <Trash2 className="h-4 w-4" />
</div>
  <div className="p-5 bg-[#EBFFE9]">
  
        <EditableText
          defaultValue={expression.label ?? ""}
          placeholder="Label"
          className="inline-flex rounded text-xl font-semibold "
          onSave={(value)=> {saveExpression(value,"label")}}
        />
        <div className="mt-2">

        <EditableText
            defaultValue={expression.note ?? ""}
            placeholder="Note"
            className="text-gray-600"
            onSave={(value)=> {saveExpression(value,"note")}}
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
                  saveExpression(pattern, "pattern")
                }}
              >
                Save
              </Button>
            </div>
          </>
        ) : (
          <div
            onClick={() => setEditingPattern(true)}
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