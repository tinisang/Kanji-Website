"use client";

import { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ChevronRight,
  BookOpenCheck,
} from "lucide-react";

import { Vocabulary } from "@/app/kanji/types/vocabulary";
import { EditableText } from "../../kanji/components/EditableText";
import { useKanji } from "@/contexts/Context";
import { updateVocabulary } from "../api/vocabulary.client";
import VocabularyItemContent from "./VocabularyItemContent";

import {
  addToReview,
  deleteReviewItemByTarget,
  getReviewProgressByItemId,
  getReviewItemByTarget,
} from "@/app/review/clients/review.client";

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
  const [review, setReview] = useState<any>(null);

  useEffect(() => {
    async function fetchReview() {
      try {
        const item = await getReviewItemByTarget(
          "kanji",
          vocabulary.id
        );

        if (!item) {
          setReview(null);
          return;
        }

        const progress = await getReviewProgressByItemId(
          item.id
        );

        setReview({
          item,
          progress,
        });
      } catch {
        setReview(null);
      }
    }

    fetchReview();
  }, [vocabulary.id]);

  async function onChange<K extends keyof Vocabulary>(
    key: K,
    value: Vocabulary[K]
  ) {
    setData((prev) => ({
      ...prev,
      vocabularies: {
        ...prev.vocabularies,
        [vocabulary.id]: {
          ...prev.vocabularies[vocabulary.id],
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

      setReview(null);
      return;
    }

    const item = await addToReview(
      "kanji",
      vocabulary.id
    );

    const progress =
      await getReviewProgressByItemId(item.id);

    setReview({
      item,
      progress,
    });
  }

  function hasNote(note?: string | null) {
    if (!note) return false;

    return (
      note
        .replace(/<[^>]+>/g, "")
        .trim().length > 0
    );
  }

  const isActiveReview =
    !!review && !review.item.archived;

  const reviewClass = !isActiveReview
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
      className={`
        w-full overflow-hidden rounded-xl border
        shadow-sm transition-all
        ${reviewClass}
      `}
    >
      <div
        className="
          flex flex-col gap-3
          px-3 py-3
          sm:flex-row sm:items-start sm:gap-4
        "
      >
        {/* Expand */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="
            hidden shrink-0 rounded p-1
            hover:bg-black/5
            sm:mt-2 sm:block
          "
        >
          {open ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>

        {/* Main content */}
        <div
          className="
            grid min-w-0 flex-1
            grid-cols-1 gap-3
            sm:grid-cols-[minmax(180px,1.2fr)_minmax(120px,0.7fr)_minmax(180px,2fr)]
            sm:items-center
          "
        >
          {/* Word */}
          <div className="flex min-w-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="shrink-0 rounded p-1 hover:bg-black/5 sm:hidden"
            >
              {open ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>

            <EditableText
              defaultValue={vocabulary.word}
              placeholder="漢字"
              className="
                !w-full
                min-w-0
                break-words
                whitespace-normal
                text-3xl
                font-bold
                leading-none
                sm:!w-[250px]
                sm:text-4xl
              "
              onSave={(value) =>
                onChange("word", value)
              }
            />

            {hasNote(vocabulary.note) && (
              <span className="shrink-0 rounded-full bg-lime-100 px-2 py-0.5 text-xs font-medium text-lime-700">
                Note
              </span>
            )}
          </div>

          {/* Reading */}
          <EditableText
            defaultValue={vocabulary.reading ?? ""}
            placeholder="かんじ"
            className="
              min-w-0
              max-w-full
              text-xl
              leading-none
              sm:min-w-[140px]
              sm:max-w-[180px]
              sm:text-2xl
            "
            onSave={(value) =>
              onChange("reading", value)
            }
          />

          {/* Meaning */}
          <EditableText
            defaultValue={vocabulary.meaning ?? ""}
            placeholder="Meaning"
            className="
              min-w-0
              max-w-full
              text-base
              leading-normal
              sm:min-w-[200px]
              sm:flex-1
              sm:text-xl
              sm:leading-none
            "
            onSave={(value) =>
              onChange("meaning", value)
            }
          />
        </div>

        {/* Actions */}
        <div
          className="
            flex shrink-0 items-center gap-1
            border-t pt-2
            sm:ml-auto sm:border-t-0 sm:pt-0
          "
        >
          <button
            type="button"
            onClick={onMoveUp}
            disabled={index === 0}
            className="
              rounded p-1.5
              hover:bg-black/5
              disabled:opacity-30
            "
          >
            <ChevronUp className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onMoveDown}
            disabled={index === total - 1}
            className="
              rounded p-1.5
              hover:bg-black/5
              disabled:opacity-30
            "
          >
            <ChevronDown className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onAddToReview}
            className={`
              rounded p-1.5 transition-colors
              ${
                isActiveReview
                  ? "bg-emerald-100 text-emerald-700"
                  : "text-neutral-500 hover:bg-black/5"
              }
            `}
            title="Add to Review"
          >
            <BookOpenCheck className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="
              rounded p-1.5
              text-red-500
              hover:bg-red-50
            "
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