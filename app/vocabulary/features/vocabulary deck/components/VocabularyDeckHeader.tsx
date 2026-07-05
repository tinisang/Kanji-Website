"use client";

import { useState } from "react";
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
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="group flex w-full items-center justify-between gap-6 cursor-pointer">
        <div className="flex items-center gap-6">
          <div>
            <h2 className="text-4xl font-bold ">{word}</h2>
          </div>

          <div className="h-12 w-px bg-black/15" />

          <div>
            <p className="text-lg font-medium uppercase  text-black/70">
              {hanViet}
            </p>

            <p className="mt-1 text-base text-black/60">
              {meaning}
            </p>
          </div>
        </div>

        <div
          role="button"
          tabIndex={0}
          className="
            flex h-10 w-10 items-center justify-center
            rounded-full
            text-black/40
            opacity-0
            transition-all duration-200
            group-hover:opacity-100
            hover:bg-red-500 hover:text-white hover:scale-110
          "
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              e.stopPropagation();
              setOpen(true);
            }
          }}
        >
          <Trash2 size={18} onClick={onDelete} className="cursor-pointer" />
        </div>
      </div>

    </>
  );
}