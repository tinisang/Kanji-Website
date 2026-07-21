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
    <div className="relative flex gap-4 rounded-lg bg-emerald-50 p-4">
      <Button
        size="icon"
        variant="ghost"
        className="absolute right-2 top-2 text-red-500 hover:text-red-600"
        onClick={handleDelete}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <div className="flex w-40 shrink-0 flex-col rounded-md bg-white p-3 shadow-sm">
        <EditableText
          defaultValue={usage.expression.word || ""}
          placeholder="Keyword..."
          className="text-2xl font-bold"
          renderDisplay={(value) =>
            highlight(value, vocabulary.word)
          }
          onSave={onKeywordSave}
        />

        <div className="mt-2 rounded bg-emerald-400 px-2 py-1 text-center text-xs font-semibold text-white">
          <EditableText
            defaultValue={usage.expression.meaning}
            placeholder="Meaning..."
            className="w-full text-center text-white"
            onSave={onMeaningSave}
          />
        </div>
      </div>

      <div className="flex-1 space-y-4">
        <VocabularyExamples
          keyword={vocabulary.word}
          examples={usage.examples}
          expression={usage.expression}
        />
      </div>
    </div>
  );
}