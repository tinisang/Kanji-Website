"use client";

import { Trash2 } from "lucide-react";

interface Props {
  word: string;
  hanViet: string;
  meaning: string;
  onDelete?: () => void;
}

export default function VocabularyDeckHeader({
  word,
  hanViet,
  meaning,
  onDelete,
}: Props) {
  return (
    <div className="group flex items-center justify-between gap-4 rounded-xl transition-colors">
      <div className="flex min-w-0 flex-1 items-center gap-8">
        <h1 className="!text-[35px] font-bold leading-none tracking-tight text-zinc-900">
          {word}
        </h1>

        <span className="!text-[26px] font-medium tracking-wide text-zinc-800">
          {hanViet}
        </span>

        <span className="!text-lg text-zinc-600">{meaning}</span>

        <label className="ml-auto flex flex-1 items-center justify-end gap-2 text-sm text-zinc-500">
          <input type="checkbox" />
          Need Revision
        </label>
      </div>

      <div
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDelete?.();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.stopPropagation();
            onDelete?.();
          }
        }}
        className="
          flex h-9 w-9 cursor-pointer items-center justify-center
          rounded-lg text-zinc-400 opacity-0 transition-all
          group-hover:opacity-100
          hover:bg-red-500 hover:text-white
        "
      >
        <Trash2 size={18} />
      </div>
    </div>
  );
}