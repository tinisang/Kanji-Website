"use client";

import { useEffect, useState } from "react";
import {
  GripVertical,
  Pencil,
  Trash2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { EditableText } from "@/app/kanji/features/kanji/components/EditableText";

import { Grammar } from "@/app/grammar/lib/types/Grammar";

import {
  updateGrammarUI,
  useGrammar,
} from "@/app/grammar/contexts/GrammarContext";

import { updateGrammar } from "../clients/grammarClient";

import {
  addToReview,
  deleteReviewItemByTarget,
  getReviewItemByTarget,
} from "@/app/review/clients/review.client";

interface Props {
  grammar: Grammar;
  expressionCount: number;
  handleRef: (element: HTMLElement | null) => void;
  onDelete: () => void;
}

export default function GrammarDeckHeader({
  grammar,
  expressionCount,
  handleRef,
  onDelete,
}: Props) {
  const { setGrammarData } = useGrammar();

  const [editingTitle, setEditingTitle] = useState(false);

  const [needRevision, setNeedRevision] = useState(false);

  useEffect(() => {
    async function loadReviewState() {
      const reviewItem = await getReviewItemByTarget(
        "grammar",
        grammar.id
      );

      setNeedRevision(!!reviewItem);
    }

    loadReviewState();
  }, [grammar.id]);

  async function handleRevisionChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    e.stopPropagation();

    const checked = e.target.checked;

    // Optimistic UI
    setNeedRevision(checked);

    const reviewItem = await getReviewItemByTarget(
      "grammar",
      grammar.id
    );

    if (checked) {
      if (!reviewItem) {
        await addToReview(
          "grammar",
          grammar.id
        );
      }

      return;
    }

    if (reviewItem) {
      await deleteReviewItemByTarget(
        "grammar",
        grammar.id
      );
    }
  }

  return (
    <div
      className={cn(
        "group flex w-full items-center gap-3 rounded-md px-2 py-1 transition-colors",
        needRevision && "bg-yellow-100"
      )}
    >
      {/* Drag handle */}
      <div
        ref={handleRef}
        onClick={(e) => e.stopPropagation()}
        className="cursor-grab text-gray-400 active:cursor-grabbing"
      >
        <GripVertical className="h-5 w-5" />
      </div>

      {/* Title */}
      <div
        className={cn(
          "flex items-center gap-2 rounded-md px-2 py-1 transition-colors",
          editingTitle && "bg-muted"
        )}
      >
        {editingTitle ? (
          <div
            onClick={(e) => e.stopPropagation()}
          >
            <EditableText
              autoFocus
              defaultValue={grammar.title}
              className="text-2xl font-bold"
              onBlur={() =>
                setEditingTitle(false)
              }
              onSave={async (title) => {
                setEditingTitle(false);

                if (
                  !title.trim() ||
                  title === grammar.title
                ) {
                  return;
                }

                const updatedGrammar = {
                  ...grammar,
                  title,
                };

                updateGrammarUI(
                  setGrammarData,
                  updatedGrammar
                );

                await updateGrammar(
                  updatedGrammar
                );
              }}
            />
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold">
              {grammar.title}
            </h2>

            <div
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setEditingTitle(true);
              }}
              className="
                rounded p-1
                text-gray-400
                opacity-0
                transition
                hover:bg-gray-100
                hover:text-black
                group-hover:opacity-100
              "
            >
              <Pencil className="h-4 w-4" />
            </div>
          </>
        )}
      </div>

      {/* Need Revision */}
      <label
        className="
          ml-auto
          flex cursor-pointer
          items-center gap-2
          whitespace-nowrap
          text-sm text-zinc-500
        "
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <input
          type="checkbox"
          checked={needRevision}
          onChange={handleRevisionChange}
          className="h-3.5 w-3.5 rounded border-zinc-300"
        />

        Need Revision
      </label>

      {/* Expression count */}
      <span
        className="
          flex h-7 min-w-7
          items-center justify-center
          rounded-full bg-yellow-400
          px-2 text-sm font-bold
        "
      >
        {expressionCount}
      </span>

      {/* Delete */}
      <div
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDelete();
        }}
        onKeyDown={(e) => {
          if (
            e.key === "Enter" ||
            e.key === " "
          ) {
            e.preventDefault();
            e.stopPropagation();
            onDelete();
          }
        }}
        className="
          rounded p-1
          text-gray-400
          opacity-0
          transition
          hover:bg-red-100
          hover:text-red-600
          group-hover:opacity-100
        "
      >
        <Trash2 className="h-4 w-4" />
      </div>
    </div>
  );
}