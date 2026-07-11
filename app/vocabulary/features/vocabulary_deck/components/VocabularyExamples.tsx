"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { ExpressionExample } from "@/app/vocabulary/lib/types/expressionExample";
import VocabularyExampleItem from "./VocabularyExampleItem";
import { addExampleUI, useVocabulary } from "@/app/vocabulary/context.ts/VocabularyContext";
import { VocabularyExpression } from "@/app/vocabulary/lib/types/vocabularyExpression";
import { createExpressionExample } from "../clients/expressionExampleClient";

interface Props {
  keyword: string;
  examples: Record<string, ExpressionExample>;
    expression: VocabularyExpression

}

export default function VocabularyExamples({
  keyword,
  examples,
  expression,

 
}: Props) {


    const {setVocabularyData} = useVocabulary();


    async function onAddExample(){

        const newExample =  await createExpressionExample(

            {
                expression_id:  expression.id,
                example: "",
                meaning: "",
                note: "",

    

            }
        );
        addExampleUI(
            setVocabularyData,
            expression.id,
            newExample.id


         )
    }


    


  return (
    <div className="flex-1 space-y-4">
      {Object.values(examples).map((example) => (
        <VocabularyExampleItem
          key={example.id}
          keyword={keyword}
          example={example}
          expression={expression}

        />
      ))}

      <Button
  variant="ghost"
  onClick={onAddExample}
  className="cursor-pointer group h-10 w-full justify-start rounded-lg border border-dashed border-gray-300 text-gray-500 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-600"
>
  <Plus className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
  <span>Add example</span>
</Button>
    </div>
  );
}