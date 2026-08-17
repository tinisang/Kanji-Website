"use client";

import { useState } from "react";
import { Check, Pencil, Trash2, X } from "lucide-react";
import {
  updateVocabularyUI,
  useVocabulary,
} from "@/app/vocabulary/context.ts/VocabularyContext";
import { Vocabulary } from "@/app/kanji/types/vocabulary";
import { updateVocabulary } from "@/app/kanji/features/vocabulary/api/vocabulary.client";
import { addToReview } from "@/app/review/clients/review.client";

interface Props {
  vocabulary: Vocabulary;
  index: number;
  word: string;
  hanViet: string;
  meaning: string;
  onEdit?: (data: {
    word: string;
    hanViet: string;
    meaning: string;
  }) => void;
  onDelete?: () => void;
}

export default function VocabularyDeckHeader({
  word,
  hanViet,
  meaning,
  vocabulary,
  index,
  onEdit,
  onDelete,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [needRevision, setNeedRevision] = useState(false);

  const { setVocabularyData } = useVocabulary();

  const [editWord, setEditWord] = useState(word);
  const [editHanViet, setEditHanViet] = useState(hanViet);
  const [editMeaning, setEditMeaning] = useState(meaning);

  function startEditing() {
    setEditWord(word);
    setEditHanViet(hanViet);
    setEditMeaning(meaning);
    setEditing(true);
  }

  function cancelEditing() {
    setEditWord(word);
    setEditHanViet(hanViet);
    setEditMeaning(meaning);
    setEditing(false);
  }

  async function saveEditing() {
    const updatedVocabulary = {
      ...vocabulary,
      word: editWord,
      reading: editHanViet,
      meaning: editMeaning,
    };

    onEdit?.({
      word: editWord,
      hanViet: editHanViet,
      meaning: editMeaning,
    });

    updateVocabularyUI(setVocabularyData, updatedVocabulary);

    await updateVocabulary(updatedVocabulary);

    setEditing(false);
  }

  async function handleRevisionChange(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    e.stopPropagation();

    const checked = e.target.checked;
    setNeedRevision(checked);

    if (!checked) return;

    await addToReview(
      "vocabulary",
      vocabulary.id
    )
  }

  const inputClassName =
    "h-9 w-full rounded-md border border-zinc-200 bg-white px-2.5 text-sm outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100";

  return (
    <div className="group grid grid-cols-[40px_minmax(120px,0.7fr)_minmax(100px,0.5fr)_minmax(200px,1.5fr)_auto_auto_auto] items-center gap-6">
      {/* Index */}
      <span className="text-sm font-medium text-zinc-400">
        {index + 1}
      </span>

      {/* Word */}
      {editing ? (
        <input
          autoFocus
          value={editWord}
          onChange={(e) => setEditWord(e.target.value)}
          className={inputClassName}
          placeholder="Word"
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <h1 className="truncate text-[25px] font-bold leading-none tracking-tight text-zinc-900">
          {word}
        </h1>
      )}

      {/* Hán Việt */}
      {editing ? (
        <input
          value={editHanViet}
          onChange={(e) => setEditHanViet(e.target.value)}
          className={inputClassName}
          placeholder="Hán Việt"
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <span className="truncate text-[18px] font-medium tracking-wide text-zinc-700">
          {hanViet}
        </span>
      )}

      {/* Meaning */}
      {editing ? (
        <input
          value={editMeaning}
          onChange={(e) => setEditMeaning(e.target.value)}
          className={inputClassName}
          placeholder="Meaning"
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <span className="truncate text-[15px] text-zinc-500">
          {meaning}
        </span>
      )}

      {/* Need Revision */}
      <label
        className="flex cursor-pointer items-center gap-2 whitespace-nowrap text-sm text-zinc-500"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="checkbox"
          checked={needRevision}
          onChange={handleRevisionChange}
          className="h-3.5 w-3.5 rounded border-zinc-300"
        />
        Need Revision
      </label>

      {/* Actions */}
      {editing ? (
        <>
          {/* Save */}
          <div
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              saveEditing();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                saveEditing();
              }
            }}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-emerald-500 hover:bg-emerald-50"
          >
            <Check size={17} />
          </div>

          {/* Cancel */}
          <div
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              cancelEditing();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                cancelEditing();
              }
            }}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
          >
            <X size={17} />
          </div>
        </>
      ) : (
        <>
          {/* Edit */}
          <div
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              startEditing();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                startEditing();
              }
            }}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-zinc-400 opacity-0 transition-all group-hover:opacity-100 hover:bg-zinc-100 hover:text-zinc-700"
          >
            <Pencil size={16} />
          </div>

          {/* Delete */}
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
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-zinc-400 opacity-0 transition-all group-hover:opacity-100 hover:bg-red-50 hover:text-red-500"
          >
            <Trash2 size={16} />
          </div>
        </>
      )}
    </div>
  );
}