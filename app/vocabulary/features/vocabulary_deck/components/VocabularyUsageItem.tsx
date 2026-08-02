import { EditableText } from "@/app/kanji/features/kanji/components/EditableText";
import {
  deleteExpressionUI,
  updateExpressionUI,
  useVocabulary,
} from "@/app/vocabulary/context.ts/VocabularyContext";
import { Usage } from "@/app/vocabulary/lib/types/Usage";
import { Vocabulary } from "@/app/vocabulary/lib/types/vocabulary";
import {
  deleteVocabularyExpression,
  updateVocabularyExpression,
} from "../clients/vocabularyExpressionClient";
import VocabularyExamples from "./VocabularyExamples";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Props {
  usage: Usage;
  vocabulary: Vocabulary;
}

export default function VocabularyUsageItem({
  usage,
  vocabulary,
}: Props) {
  const { setVocabularyData } = useVocabulary();

  function highlight(text: string, keyword: string) {
    if (!text) {
      return (
        <span className="italic text-gray-400">
          Empty
        </span>
      );
    }

    if (!keyword) return text;

    return text.split(keyword).map((part, index, arr) => (
      <span key={index}>
        {part}
        {index < arr.length - 1 && (
          <span className="opacity-35">
            {keyword}
          </span>
        )}
      </span>
    ));
  }

  async function onKeywordSave(value: string) {
    const updatedExpression = {
      ...usage.expression,
      word: value,
    };

    await updateVocabularyExpression(updatedExpression);
    updateExpressionUI(
      setVocabularyData,
      updatedExpression
    );
  }

  function onMeaningSave(value: string) {
    const updatedExpression = {
      ...usage.expression,
      meaning: value,
    };

    updateVocabularyExpression(updatedExpression);
    updateExpressionUI(
      setVocabularyData,
      updatedExpression
    );
  }

  async function handleDelete() {
    deleteExpressionUI(setVocabularyData, usage.expression.id );
    await deleteVocabularyExpression(usage.expression.id)
  }

 return (
  <div className="group relative border-b border-gray-200 py-3 px-6">
  <Button
    size="icon"
    variant="ghost"
    className="absolute right-0 top-0 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
    onClick={handleDelete}
  >
    <Trash2 className="h-4 w-4 text-gray-400" />
  </Button>
  <div className="grid  !grid-cols-[1fr_1fr] gap-2">
<div className="grid  !grid-cols-[1fr_1fr] gap-2">
  <EditableText
    defaultValue={usage.expression.word}
    placeholder="Expression..."
    className="text-2xl font-semibold tracking-tight"
    renderDisplay={(value) =>
      highlight(value, vocabulary.word)
    }
    onSave={onKeywordSave}
  />

  <EditableText
    defaultValue={usage.expression.meaning}
    placeholder="Meaning..."
    className="mt-1 text-sm text-gray-500"
    onSave={onMeaningSave}
  />
</div>
  <div className="">
    <VocabularyExamples
      keyword={vocabulary.word}
      examples={usage.examples}
      expression={usage.expression}
    />
  </div>

  </div>
</div>
);
}