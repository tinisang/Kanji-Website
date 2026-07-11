import { EditableText } from "@/app/kanji/features/kanji/components/EditableText";
import { updateExpressionUI, useVocabulary } from "@/app/vocabulary/context.ts/VocabularyContext";
import { ExpressionExample } from "@/app/vocabulary/lib/types/expressionExample";
import { Usage } from "@/app/vocabulary/lib/types/Usage";
import { Vocabulary } from "@/app/vocabulary/lib/types/vocabulary";
import { VocabularyExpression } from "@/app/vocabulary/lib/types/vocabularyExpression";
import { updateVocabularyExpression } from "../clients/vocabularyExpressionClient";
import VocabularyExamples from "./VocabularyExamples";

interface Example {
  jp: string;
  vn: string;
}


interface Props {
  usage: Usage;
  vocabulary: Vocabulary;
}

export default function VocabularyUsageItem({
  usage, vocabulary
}: Props) {

  const {setVocabularyData} = useVocabulary();
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
      word: value
    }
    await updateVocabularyExpression(updatedExpression);

    
  }
  function onMeaningSave(value: string) {}

  return (
    <div className="flex gap-4 rounded-lg bg-emerald-50 p-4">
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
  expression = {usage.expression}

/>
      </div>
    </div>
  );
}