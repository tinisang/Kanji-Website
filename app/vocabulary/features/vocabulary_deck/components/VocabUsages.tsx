"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import VocabularyUsageItem from "./VocabularyUsageItem";
import { addExpressionUI, useVocabulary } from "@/app/vocabulary/context.ts/VocabularyContext";
import { createVocabularyExpression } from "../clients/vocabularyExpressionClient";
import { VocabularyExpression } from "@/app/vocabulary/lib/types/vocabularyExpression";
import { ExpressionExample } from "@/app/vocabulary/lib/types/expressionExample";
import { Vocabulary } from "@/app/vocabulary/lib/types/vocabulary";
import { Usage } from "@/app/vocabulary/lib/types/Usage";


interface Props {
  vocabulary: Vocabulary;
  usages: Record<string, Usage>;
}

export default function VocabUsages({
  vocabulary,
  usages,

}: Props) {

  const {setVocabularyData} = useVocabulary();

    async function onAddExpression(){
        
        const newExpression = await createVocabularyExpression(vocabulary.id,{
          word: "",
          reading: "",
          meaning: "",
          vocabulary_id: vocabulary.id,
        
        });
        addExpressionUI(setVocabularyData, vocabulary.id, newExpression.id);
    }

  return (
    <div className="space-y-4">
      <div className="grid gap-5 lg:grid-cols-2">
        {Object.values(usages).map((usage, index) => {
      
          return (
            <VocabularyUsageItem
              key={usage.expression.id}
              usage={usage}
              vocabulary={vocabulary}
            />
          );
        })}
      </div>

      <Button
        variant="outline"
        className="w-full border-dashed cursor-pointer hover:bg-gray-50"
        onClick={onAddExpression}

      >
        <Plus className="mr-2 h-4 w-4" />
        Add Expression
      </Button>
    </div>
  );
}