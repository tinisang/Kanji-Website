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
  className="
    group
    h-0 overflow-hidden
    w-full justify-start rounded-md px-1.5
    text-muted-foreground/60
    opacity-0
    transition-all duration-200
    group-hover/usage:h-7
    group-hover/usage:opacity-100
  "
>
 
  <Plus className="mr-1.5 h-3.5 w-3.5" />
  <span className="text-xs">Add example</span>
</Button>
    </div>
  );
}