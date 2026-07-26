"use client";

import { useState } from "react";

import { Vocabulary } from "@/app/kanji/types/vocabulary";
import { EditableText } from "../../kanji/components/EditableText";
import { useKanji } from "@/contexts/Context";
import { updateVocabulary } from "../api/vocabulary.client";
import {
  ChevronDown,
  ChevronUp,
  ChevronRight,
  BookOpenCheck,
} from "lucide-react";
import VocabularyItemContent from "./VocabularyItemContent";
import { addToReview, deleteReviewItemByTarget, getReviewProgressByItemId } from "@/app/review/clients/review.client";


interface Props {
  vocabulary: Vocabulary;
  index: number;
  total: number;

  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
}

export default function VocabularyItem({
  vocabulary,
  index,
  total,
  onMoveUp,
  onMoveDown,
  onDelete,
}: Props) {
  const { data, setData } = useKanji();

  const [open, setOpen] = useState(false);

  const review =
    data.kanji_review_items[vocabulary.id];

  async function onChange<
    K extends keyof Vocabulary
  >(key: K, value: Vocabulary[K]) {
    setData((prev) => ({
      ...prev,
      vocabularies: {
        ...prev.vocabularies,
        [vocabulary.id]: {
          ...prev.vocabularies[
            vocabulary.id
          ],
          [key]: value,
        },
      },
    }));

    await updateVocabulary({
      ...vocabulary,
      [key]: value,
    });
  }

  
async function onAddToReview() {
  if (review && !review.item.archived) {
    await deleteReviewItemByTarget(
      "kanji",
      vocabulary.id
    );

    setData((prev) => {
      const next = {
        ...prev.kanji_review_items,
      };

      delete next[vocabulary.id];

      return {
        ...prev,
        kanji_review_items: next,
      };
    });

    return;
  }

  const item = await addToReview(
    "kanji",
    vocabulary.id
  );

  const newProgress = await getReviewProgressByItemId(
    item.id
  );

  

  setData((prev) => ({
    ...prev,
    kanji_review_items: {
      ...prev.kanji_review_items,
      [vocabulary.id]: {
        item,
        progress: newProgress,
      },
    },
  }));
}

  function hasNote(
    note?: string | null
  ) {
    if (!note) return false;

    return (
      note.replace(/<[^>]+>/g, "").trim()
        .length > 0
    );
  }
const reviewClass =
  !review || review.item.archived
    ? "border-neutral-200 bg-white"
    : review.progress?.state === "new"
    ? "border-blue-200 bg-blue-50"
    : review.progress?.state === "learning"
    ? "border-amber-200 bg-amber-50"
    : review.progress?.state === "review"
    ? "border-emerald-200 bg-emerald-50"
    : review.progress?.state === "relearning"
    ? "border-rose-200 bg-rose-50"
    : "border-neutral-200 bg-white";
  return (
    <div
  className={`overflow-hidden rounded-xl border transition-all shadow-sm ${reviewClass}`}
>
      <div className="flex items-start gap-4 px-3 py-3">
        <button
          type="button"
          onClick={() =>
            setOpen((v) => !v)
          }
          className="mt-2 rounded p-1 hover:bg-neutral-100"
        >
          {open ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>

        <div className="flex items-center gap-2">
          <EditableText
            defaultValue={
              vocabulary.word
            }
            placeholder="漢字"
            className="!w-[250px] break-words whitespace-normal text-4xl font-bold leading-none"
            onSave={(value) =>
              onChange("word", value)
            }
          />

          {hasNote(
            vocabulary.note
          ) && (
            <span className="rounded-full bg-lime-100 px-2 py-0.5 text-xs font-medium text-lime-700">
              Note
            </span>
          )}
        </div>

        <EditableText
          defaultValue={
            vocabulary.reading ?? ""
          }
          placeholder="かんじ"
          className="min-w-[140px] max-w-[180px] text-2xl leading-none"
          onSave={(value) =>
            onChange(
              "reading",
              value
            )
          }
        />

        <EditableText
          defaultValue={
            vocabulary.meaning ?? ""
          }
          placeholder="Meaning"
          className="min-w-[200px] flex-1 text-xl leading-none"
          onSave={(value) =>
            onChange(
              "meaning",
              value
            )
          }
        />

        <div className="ml-auto flex gap-1">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={index === 0}
            className="rounded p-1 hover:bg-neutral-100 disabled:opacity-30"
          >
            <ChevronUp className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onMoveDown}
            disabled={
              index === total - 1
            }
            className="rounded p-1 hover:bg-neutral-100 disabled:opacity-30"
          >
            <ChevronDown className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onAddToReview}
            className={`rounded p-1 ${
              review &&
              !review.item.archived
                ? "bg-emerald-100 text-emerald-700"
                : "text-neutral-500 hover:bg-neutral-100"
            }`}
            title="Add to Review"
          >
            <BookOpenCheck className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="rounded p-1 text-red-500 hover:bg-red-50"
          >
            ✕
          </button>
        </div>
      </div>

      {open && (
        <VocabularyItemContent
          vocabulary={vocabulary}
        />
      )}
    </div>
  );
}