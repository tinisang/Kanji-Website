"use client";

import { addExpressionUI, useGrammar } from "@/app/grammar/contexts/GrammarContext";
import { Plus } from "lucide-react";
import { createGrammarExpression } from "../clients/grammarExpressionClient";
import { Grammar } from "@/app/grammar/lib/types/Grammar";

interface Props{
    grammar: Grammar
}

export default function AddGrammarExpressionButton({grammar}:Props) {
    const {setGrammarData} = useGrammar()

    async function handleAdd(){

        const newExpression = await createGrammarExpression(
            {
                grammar_id: grammar.id,
                label: "",
                pattern: "",
                meaning: "",
                note: ""
            }
        )

        addExpressionUI(
            setGrammarData,
            grammar.id,
            newExpression.id

        )
    }

  return (
    <button
    onClick={handleAdd}
      type="button"
 className="
  flex w-full items-center justify-center gap-2
  rounded-xl border border-dashed border-[#B8F7AF]
  bg-[#E5FFE2]
  px-4 py-3
  text-sm font-medium text-[#2E7D32]
  transition-all
  hover:bg-[#DCFFD8]
  hover:border-[#8DE67F]
  cursor-pointer
"
    >
      <Plus className="h-4 w-4" />
      Add Expression
    </button>
  );
}