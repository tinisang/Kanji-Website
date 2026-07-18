"use client";

import { Trash2 } from "lucide-react";

import { EditableText } from "@/app/kanji/features/kanji/components/EditableText";
import { GrammarExpressionExample } from "@/app/grammar/lib/types/GrammarExpressionExample ";
import { deleteExampleUI, updateExampleUI, useGrammar } from "@/app/grammar/contexts/GrammarContext";
import { deleteGrammarExpressionExampleAPI, updateGrammarExpressionExampleAPI } from "../clients/grammarExpressionExampleClient";

interface Props {
  example: GrammarExpressionExample;
 
}

export default function GrammarExpressionExampleItem({
  example,
  
}: Props) {

    const {setGrammarData} = useGrammar()


    async function deleteExample(){

            deleteExampleUI(
                setGrammarData,
                example.id
            )
            await deleteGrammarExpressionExampleAPI(example.id)

    }

    async function saveExample(
  value: string,
  field: "example" | "meaning"
) {
  const updated = {
    ...example,
    [field]: value,
  };

  updateExampleUI(setGrammarData, updated)

  await updateGrammarExpressionExampleAPI(updated);
}
  return (
    <div className="group relative rounded-lg border border-transparent p-2 transition hover:border-gray-200 hover:bg-gray-50">
      <button
        onClick={deleteExample}
        className="absolute top-2 z-10 right-2 rounded p-1 text-gray-400 opacity-0 transition hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
      >
        <Trash2 size={16} />
      </button>

      <div className="flex flex-col gap-1">
        <EditableText
          defaultValue={example.example ?? ""}
          placeholder="Example"
          className="font-semibold text-gray-900"
          onSave={(value) => saveExample(value, "example")}
        />

        <EditableText
          defaultValue={example.meaning ?? ""}
          placeholder="Meaning"
          className="text-sm text-gray-500"
           onSave={(value) => saveExample(value, "meaning")}
        />
      </div>
    </div>
  );
}