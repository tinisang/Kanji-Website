"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  X,
} from "lucide-react";

import { Vocabulary } from "@/app/vocabulary/lib/types/vocabulary";
import { ReviewProgress } from "../lib/types/reviewProgress";

interface Props {
  vocabulary: Vocabulary;
  progress: ReviewProgress;
  onDelete?: () => void;
}

export default function ReviewVocabularyCard({
  vocabulary,
  progress,
  onDelete,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border bg-white p-4 transition-colors hover:bg-neutral-50">
      <div className="flex items-start gap-2">
        <button
          type="button"
          onClick={() =>
            vocabulary.note &&
            setOpen((v) => !v)
          }
          className={`mt-1 rounded-md p-1 transition ${
            vocabulary.note
              ? "text-neutral-500 hover:bg-neutral-100"
              : "pointer-events-none opacity-0"
          }`}
        >
          {open ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>

        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <h3 className="truncate text-3xl font-bold leading-none">
              {vocabulary.word}
            </h3>

            <button
              type="button"
              onClick={onDelete}
              className="rounded-md p-1.5 text-neutral-400 transition hover:bg-red-50 hover:text-red-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {vocabulary.reading && (
            <div>
              <span className="inline-flex rounded-full bg-sky-100 px-2.5 py-1 text-xs font-medium text-sky-700">
                {vocabulary.reading}
              </span>
            </div>
          )}

          <p className="text-sm leading-6 text-neutral-600">
            {vocabulary.meaning}
          </p>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
              {progress.state}
            </span>

            <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700">
              {progress.repetitions} reviews
            </span>

            {progress.lapses > 0 && (
              <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700">
                {progress.lapses} lapses
              </span>
            )}
          </div>
        </div>
      </div>

      {open && vocabulary.note && (
        <div
          className="prose prose-sm prose-neutral mt-4 max-h-56 max-w-none overflow-y-auto rounded-lg border bg-neutral-50 p-4 [&_*]:text-sm"
          dangerouslySetInnerHTML={{
            __html: vocabulary.note,
          }}
        />
      )}
    </div>
  );
}