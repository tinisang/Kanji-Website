"use client";

import { useState } from "react";
import {
  ChevronDown,
  Loader2,
  X,
} from "lucide-react";

import { Kanji } from "@/app/kanji/types/kanji";

import {
  getVocabulariesByKanjiId,
  deleteKanjiVocabulary,
} from "@/app/kanji/features/kanji-vocabulary/api/kanji-vocabulary.client";

import {
  getReviewItemByTarget,
  getReviewProgressByItemId,
} from "@/app/review/clients/review.client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Vocabulary {
  id: string;
  word: string;
  reading?: string;
  meaning?: string;
  position: number;
}

interface ReviewData {
  item: any;
  progress: any;
}

interface KanjiGroupGridProps {
  kanjis: Kanji[];
}

export default function KanjiGroupGrid({
  kanjis,
}: KanjiGroupGridProps) {
  const [openKanjiId, setOpenKanjiId] =
    useState<string | null>(null);

  const [loadingId, setLoadingId] =
    useState<string | null>(null);

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const [deleteTarget, setDeleteTarget] =
    useState<{
      kanjiId: string;
      vocabularyId: string;
      word: string;
    } | null>(null);

  const [vocabularies, setVocabularies] =
    useState<Record<string, Vocabulary[]>>({});

  const [reviews, setReviews] =
    useState<Record<string, ReviewData | null>>({});

  async function loadReview(
    vocabularies: Vocabulary[]
  ) {
    const results = await Promise.all(
      vocabularies.map(async (vocab) => {
        try {
          const item = await getReviewItemByTarget(
            "kanji",
            vocab.id
          );

          if (!item) {
            return [vocab.id, null] as const;
          }

          const progress =
            await getReviewProgressByItemId(item.id);

          return [
            vocab.id,
            { item, progress },
          ] as const;
        } catch {
          return [vocab.id, null] as const;
        }
      })
    );

    setReviews((prev) => ({
      ...prev,
      ...Object.fromEntries(results),
    }));
  }

  async function handleKanjiClick(
    kanjiId: string
  ) {
    if (openKanjiId === kanjiId) {
      setOpenKanjiId(null);
      return;
    }

    setOpenKanjiId(kanjiId);

    if (vocabularies[kanjiId]) return;

    try {
      setLoadingId(kanjiId);

      const data =
        await getVocabulariesByKanjiId(kanjiId);

      setVocabularies((prev) => ({
        ...prev,
        [kanjiId]: data,
      }));

      await loadReview(data);
    } catch (error) {
      console.error(error);

      setVocabularies((prev) => ({
        ...prev,
        [kanjiId]: [],
      }));
    } finally {
      setLoadingId(null);
    }
  }

  async function handleDeleteVocabulary() {
    if (!deleteTarget) return;

    const {
      kanjiId,
      vocabularyId,
    } = deleteTarget;

    try {
      setDeletingId(vocabularyId);

      await deleteKanjiVocabulary(
        kanjiId,
        vocabularyId
      );

      setVocabularies((prev) => ({
        ...prev,
        [kanjiId]: (
          prev[kanjiId] ?? []
        ).filter(
          (vocab) => vocab.id !== vocabularyId
        ),
      }));

      setReviews((prev) => {
        const next = { ...prev };
        delete next[vocabularyId];
        return next;
      });

      setDeleteTarget(null);
    } catch (error) {
      console.error(
        "Failed to delete vocabulary:",
        error
      );
    } finally {
      setDeletingId(null);
    }
  }

  function getReviewState(vocabId: string) {
    return reviews[vocabId]?.progress?.state;
  }

  function getReviewClass(vocabId: string) {
    switch (getReviewState(vocabId)) {
      case "new":
        return "border-blue-200 bg-blue-50";
      case "learning":
        return "border-amber-200 bg-amber-50";
      case "review":
        return "border-emerald-200 bg-emerald-50";
      case "relearning":
        return "border-rose-200 bg-rose-50";
      default:
        return "border-neutral-200 bg-white";
    }
  }

  function getReviewStateLabel(vocabId: string) {
    switch (getReviewState(vocabId)) {
      case "new":
        return "New";
      case "learning":
        return "Learning";
      case "review":
        return "Review";
      case "relearning":
        return "Relearning";
      default:
        return null;
    }
  }

  function getReviewLabelClass(vocabId: string) {
    switch (getReviewState(vocabId)) {
      case "new":
        return "bg-blue-100 text-blue-700";
      case "learning":
        return "bg-amber-100 text-amber-700";
      case "review":
        return "bg-emerald-100 text-emerald-700";
      case "relearning":
        return "bg-rose-100 text-rose-700";
      default:
        return "";
    }
  }

  return (
    <>
      <div className="space-y-2">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {kanjis.map((kanji) => {
            const isOpen =
              openKanjiId === kanji.id;

            return (
              <button
                key={kanji.id}
                type="button"
                onClick={() =>
                  handleKanjiClick(kanji.id)
                }
                className={`
                  flex min-w-[76px]
                  flex-col items-center justify-center
                  rounded-xl border px-3 py-3
                  transition-all
                  ${
                    isOpen
                      ? "border-emerald-200 bg-emerald-50"
                      : "border-border/60 bg-muted/30 hover:bg-muted/60"
                  }
                `}
              >
                <span
                  className={`
                    text-3xl font-bold
                    ${
                      isOpen
                        ? "text-emerald-700"
                        : ""
                    }
                  `}
                >
                  {kanji.character}
                </span>

                <span className="mt-1 text-[11px] font-medium text-muted-foreground">
                  {kanji.han_viet}
                </span>

                <ChevronDown
                  className={`
                    mt-1 h-3.5 w-3.5
                    text-muted-foreground
                    transition-transform
                    ${
                      isOpen
                        ? "rotate-180"
                        : ""
                    }
                  `}
                />
              </button>
            );
          })}
        </div>

        {openKanjiId && (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {loadingId === openKanjiId ? (
              <div className="flex justify-center py-5">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            ) : (
              (() => {
                const words =
                  vocabularies[openKanjiId] ?? [];

                if (words.length === 0) {
                  return (
                    <div className="rounded-xl border bg-muted/30 py-4 text-center text-xs text-muted-foreground">
                      No vocabulary found.
                    </div>
                  );
                }

                return words.map((vocab) => {
                  const reviewLabel =
                    getReviewStateLabel(vocab.id);

                  const deleting =
                    deletingId === vocab.id;

                  return (
                    <div
                      key={vocab.id}
                      className={`
                        rounded-xl border px-3 py-2.5
                        shadow-sm transition-all
                        ${getReviewClass(vocab.id)}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-baseline gap-x-2">
                            <span className="break-words text-base font-bold">
                              {vocab.word}
                            </span>

                            {vocab.reading && (
                              <span className="text-xs text-muted-foreground">
                                {vocab.reading}
                              </span>
                            )}
                          </div>

                          {vocab.meaning && (
                            <div className="mt-0.5 break-words text-xs text-muted-foreground">
                              {vocab.meaning}
                            </div>
                          )}
                        </div>

                        {reviewLabel && (
                          <span
                            className={`
                              shrink-0 rounded-full
                              px-2 py-0.5
                              text-[10px] font-medium
                              ${getReviewLabelClass(
                                vocab.id
                              )}
                            `}
                          >
                            {reviewLabel}
                          </span>
                        )}

                        <button
                          type="button"
                          disabled={deleting}
                          onClick={() =>
                            setDeleteTarget({
                              kanjiId: openKanjiId,
                              vocabularyId: vocab.id,
                              word: vocab.word,
                            })
                          }
                          className="
                            shrink-0 rounded-md p-1
                            text-muted-foreground
                            transition-colors
                            hover:bg-red-100
                            hover:text-red-600
                            disabled:opacity-50
                          "
                          title="Remove from Kanji"
                        >
                          {deleting ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <X className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  );
                });
              })()
            )}
          </div>
        )}
      </div>

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open && !deletingId) {
            setDeleteTarget(null);
          }
        }}
      >
       <AlertDialogContent className="sm:max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Remove vocabulary?
            </AlertDialogTitle>

            <AlertDialogDescription>
              Remove{" "}
              <span className="font-semibold text-foreground">
                {deleteTarget?.word}
              </span>{" "}
              from this Kanji?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={!!deletingId}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDeleteVocabulary();
              }}
              disabled={!!deletingId}
              className="bg-red-600 hover:bg-red-700"
            >
              {deletingId ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Removing...
                </>
              ) : (
                "Remove"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}