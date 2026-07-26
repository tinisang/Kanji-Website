"use client";

import { useEffect, useState } from "react";

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
import {
  addToReview,
  getReviewItemByTarget,
} from "@/app/review/clients/review.client";
import { ReviewItem } from "@/app/review/lib/types/reviewItem";

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
  const { setData } = useKanji();

  const [open, setOpen] = useState(false);
  const [reviewItem, setReviewItem] =
    useState<ReviewItem | null>(null);

  useEffect(() => {
    async function loadReview() {
      const item =
        await getReviewItemByTarget(
          "kanji",
          vocabulary.id
        );

      setReviewItem(item ?? null);
    }

    loadReview();
  }, [vocabulary.id]);

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
    if (reviewItem && !reviewItem.archived)
      return;

    const item = await addToReview(
      "kanji",
      vocabulary.id
    );

    setReviewItem(item);
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

  return (
    <div
      className={`overflow-hidden rounded-xl border transition-all ${
        reviewItem && !reviewItem.archived
          ? "border-amber-300 bg-amber-50 shadow-sm"
          : "border-neutral-200"
      }`}
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
              reviewItem &&
              !reviewItem.archived
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