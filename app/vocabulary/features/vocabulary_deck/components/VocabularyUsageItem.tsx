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
  <div className="group/usage relative border-b border-gray-200 px-6 py-6">
    <Button
      size="icon"
      variant="ghost"
      onClick={handleDelete}
      className="
        absolute right-3 top-3 h-7 w-7
        opacity-0 transition-opacity
        group-hover/usage:opacity-100
        text-muted-foreground/40
        hover:bg-muted hover:text-destructive
      "
    >
      <Trash2 className="h-3.5 w-3.5" />
    </Button>

    <div className="grid grid-cols-[minmax(180px,0.7fr)_2fr] gap-10">
      {/* LEFT */}
      <div className="min-w-0">
       

        <EditableText
          defaultValue={usage.expression.word}
          placeholder="Expression..."
          className="text-2xl font-semibold tracking-tight"
          renderDisplay={(value) =>
            highlight(value, vocabulary.word)
          }
          onSave={onKeywordSave}
        />

        <div className="mt-2">
          <EditableText
            defaultValue={usage.expression.meaning}
            placeholder="Meaning..."
            className="text-sm leading-relaxed font-semibold"
            onSave={onMeaningSave}
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="min-w-0 border-l border-gray-100 pl-8">
      

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