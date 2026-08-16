import { useState } from "react";
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
import { ChevronDown, Trash2 } from "lucide-react";

interface Props {
  usage: Usage;
  vocabulary: Vocabulary;
}

export default function VocabularyUsageItem({
  usage,
  vocabulary,
}: Props) {
  const { setVocabularyData } = useVocabulary();
  const [open, setOpen] = useState(false);

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
          <span className="opacity-35">{keyword}</span>
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
    updateExpressionUI(setVocabularyData, updatedExpression);
  }

  async function onMeaningSave(value: string) {
    const updatedExpression = {
      ...usage.expression,
      meaning: value,
    };

    await updateVocabularyExpression(updatedExpression);
    updateExpressionUI(setVocabularyData, updatedExpression);
  }

  async function handleDelete() {
    deleteExpressionUI(setVocabularyData, usage.expression.id);
    await deleteVocabularyExpression(usage.expression.id);
  }

  return (
    <div className="group/usage relative">
      <Button
        size="icon"
        variant="ghost"
        onClick={handleDelete}
        className="
          absolute right-3 top-3 z-10 h-7 w-7
          opacity-0 transition-opacity
          group-hover/usage:opacity-100
          text-muted-foreground/40
          hover:bg-muted hover:text-destructive
        "
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>

      <div className="grid grid-cols-1 gap-1 p-2">
        {/* HEADER */}
        <div
          onClick={() => setOpen(!open)}
          className="
            min-w-0 cursor-pointer
            bg-gray-100 px-6 py-3
            hover:bg-gray-200/70
            transition-colors
          "
        >
          <div className="flex items-center justify-between ">
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
                  className="text-sm font-semibold leading-relaxed"
                  onSave={onMeaningSave}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
  {Object.keys(usage.examples).length > 0 && (
    <span className="h-2 w-2 rounded-full bg-red-500" />
  )}

  <ChevronDown
    className={`
      h-5 w-5 shrink-0
      text-muted-foreground/50
      transition-transform duration-200
      ${open ? "rotate-180" : ""}
    `}
  />
</div>
          </div>
        </div>

        {/* CONTENT */}
        <div
          className={`
            grid transition-[grid-template-rows] duration-200
            ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
          `}
        >
          <div className="overflow-hidden">
            <div className="px-3 py-3">
              <VocabularyExamples
                keyword={vocabulary.word}
                examples={usage.examples}
                expression={usage.expression}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}