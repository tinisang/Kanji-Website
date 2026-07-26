"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import { Vocabulary } from "@/app/vocabulary/lib/types/vocabulary";
import { ReviewProgress } from "../lib/types/reviewProgress";

interface Props {
  vocabulary: Vocabulary;
  progress: ReviewProgress;
}

export default function ReviewVocabularyCard({
  vocabulary,
  progress,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border p-3 transition-colors hover:bg-neutral-50">
  <div className="flex items-start gap-2">
    <button
  type="button"
  onClick={() => vocabulary.note && setOpen((v) => !v)}
  className={`mt-1 rounded p-1 transition ${
    vocabulary.note
      ? "opacity-100 text-muted-foreground hover:bg-neutral-100"
      : "pointer-events-none opacity-0"
  }`}
>
  {open ? (
    <ChevronDown className="h-3.5 w-3.5" />
  ) : (
    <ChevronRight className="h-3.5 w-3.5" />
  )}
</button>

    <div className="min-w-0 flex-1">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-end gap-2">
            <h3 className="text-2xl font-bold leading-none">
              {vocabulary.word}
            </h3>

            {vocabulary.reading && (
              <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-xs text-neutral-600">
                {vocabulary.reading}
              </span>
            )}
          </div>

          <p className="mt-1 text-sm text-neutral-600">
            {vocabulary.meaning}
          </p>
        </div>

        <div className="text-right text-xs text-neutral-500">
          <div>Due</div>
          <div className="font-medium text-neutral-700">
            {new Date(
              progress.due_at
            ).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-1">
        <span className="rounded bg-emerald-100 px-2 py-0.5 text-[11px] text-emerald-700">
          {progress.state}
        </span>

        <span className="rounded bg-neutral-100 px-2 py-0.5 text-[11px] text-neutral-700">
          {progress.repetitions} reviews
        </span>

        {progress.lapses > 0 && (
          <span className="rounded bg-red-100 px-2 py-0.5 text-[11px] text-red-700">
            {progress.lapses} lapses
          </span>
        )}
      </div>
    </div>
  </div>

  {open && vocabulary.note && (
  <div
    className="prose prose-neutral prose-sm mt-3 max-h-48 max-w-none overflow-y-auto rounded border bg-neutral-50 p-3 text-sm leading-6 [&_*]:text-sm"
    dangerouslySetInnerHTML={{
      __html: vocabulary.note,
    }}
  />
)}
</div>
  );
}