"use client";

import { addExampleUI, useGrammar } from "@/app/grammar/contexts/GrammarContext";
import { GrammarExpression } from "@/app/grammar/lib/types/GrammarExpression";

import { Plus } from "lucide-react";
import { createGrammarExpressionExampleAPI } from "../clients/grammarExpressionExampleClient";

interface Props{
  expression: GrammarExpression
}

export default function AddGrammarExampleButton({expression}:Props) {


  const {setGrammarData} = useGrammar()

  async function handleAddExample(){

    const newExample = await createGrammarExpressionExampleAPI({
        expression_id: expression.id,
        example: "",
        meaning: "",
        note: "",
    })

    addExampleUI(
      setGrammarData,
      expression.id,
      newExample.id
    )



  }
  return (
    <button
    onClick={handleAddExample}
      type="button"
      className="
        flex w-full items-center justify-center gap-2
        rounded-lg border border-dashed border-[#B8F7AF]
        bg-[#E5FFE2]
        px-3 py-2
        text-sm font-medium text-[#2E7D32]
        transition-all
        hover:border-[#8DE67F]
        hover:bg-[#DCFFD8]
        cursor-pointer
      "
    >
      <Plus className="h-4 w-4" />
      Add Example
    </button>
  );
}