"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Vocabulary } from "@/app/vocabulary/lib/types/vocabulary";
import { Usage } from "@/app/vocabulary/lib/types/Usage";
import { FolderItem } from "@/app/vocabulary/lib/types/vocabularyFolder";

import { ReviewCard } from "../../lib/types/reviewCard";
import {
  ReviewRating,
  ReviewType,
} from "../../lib/types/reviewType";

import {
  getNextReviewCard,
  submitReview,
} from "../../clients/review.client";

import {
  getUsagesByVocabularyId,
} from "@/app/vocabulary/features/vocabulary_deck/clients/vocabularyExpressionClient";


import { getReviewPreviews } from "../../services/reviewScheduler";

import ReviewQuestion from "./ReviewQuestion";
import ReviewAnswer from "./ReviewAnswer";
import ReviewRatingButtons from "./ReviewRatingButtons";
import { getAllVocabularyFolder } from "@/app/vocabulary/features/vocab_folders/clients/vocabularyFolderClient";

interface Props {
  type: ReviewType;

  onRate?: (
    reviewItemId: string,
    rating: ReviewRating
  ) => Promise<void>;
}

export default function VocabularyReview({
  type,
  onRate,
}: Props) {
  const [current, setCurrent] =
    useState<ReviewCard<Vocabulary> | null>(null);

  const [loading, setLoading] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);

  const [usages, setUsages] =
    useState<Record<string, Usage>>({});

  const [ratingLoading, setRatingLoading] =
    useState(false);

  const [folders, setFolders] =
    useState<FolderItem[]>([]);

  const [selectedFolderIds, setSelectedFolderIds] =
    useState<string[]>([]);

  useEffect(() => {
    if (type !== "vocabulary") return;

    async function loadFolders() {
      try {
        const data =
          await getAllVocabularyFolder();

        setFolders(data);
      } catch (error) {
        console.error(
          "Failed to load vocabulary folders:",
          error
        );

        setFolders([]);
      }
    }

    loadFolders();
  }, [type]);

  async function loadNextCard() {
    try {
      setLoading(true);

      const card = await getNextReviewCard(
        type,
        type === "vocabulary"
          ? selectedFolderIds
          : []
      );

      setCurrent(card);
      setShowAnswer(false);
      setUsages({});
    } catch (error) {
      console.error(
        "Failed to load next review card:",
        error
      );

      setCurrent(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNextCard();
  }, [type, selectedFolderIds.join(",")]);

  const vocabId = current?.content?.id;

useEffect(() => {
  if (!vocabId) {
    setUsages({});
    return;
  }

  const id = vocabId;

  async function loadUsages() {
    try {
      const data = await getUsagesByVocabularyId(id);

      setUsages(data);
    } catch (error) {
      console.error(
        "Failed to load vocabulary usages:",
        error
      );

      setUsages({});
    }
  }

  loadUsages();
}, [vocabId]);
  async function rate(rating: ReviewRating) {
    if (ratingLoading || !current) return;

    try {
      setRatingLoading(true);

      const reviewItemId = current.item.id;

      if (onRate) {
        await onRate(
          reviewItemId,
          rating
        );
      } else {
        await submitReview(
          reviewItemId,
          rating
        );
      }

      await loadNextCard();
    } catch (error) {
      console.error(
        "Failed to submit review:",
        error
      );
    } finally {
      setRatingLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[45vh] items-center justify-center">
        <div className="text-sm text-muted-foreground">
          Loading...
        </div>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="flex min-h-[45vh] items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            🎉 Finished
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            No more cards to review.
          </p>
        </div>
      </div>
    );
  }

  const usageList = Object.values(usages);

  const previews = getReviewPreviews(
    current.progress
  );

  return (
    <div className="mx-auto w-full max-w-5xl px-2 sm:px-4">
      {type === "vocabulary" && (
        <div className="mb-4 rounded-xl border bg-background p-4">
          <div className="mb-3">
            <h3 className="text-sm font-semibold">
              Review folders
            </h3>

            <p className="mt-1 text-xs text-muted-foreground">
              Select one or more folders to review.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {folders.map((folder) => {
              const selected =
                selectedFolderIds.includes(
                  folder.id
                );

              return (
                <button
                  key={folder.id}
                  type="button"
                  disabled={ratingLoading}
                  onClick={() => {
                    setSelectedFolderIds(
                      (prev) =>
                        selected
                          ? prev.filter(
                              (id) =>
                                id !== folder.id
                            )
                          : [
                              ...prev,
                              folder.id,
                            ]
                    );
                  }}
                  className={`
                    rounded-lg
                    border
                    px-3
                    py-1.5
                    text-sm
                    transition-colors
                    ${
                      selected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-background hover:bg-muted"
                    }
                  `}
                >
                  {folder.name}
                </button>
              );
            })}
          </div>

          {selectedFolderIds.length > 0 && (
            <button
              type="button"
              disabled={ratingLoading}
              onClick={() =>
                setSelectedFolderIds([])
              }
              className="mt-3 text-xs text-muted-foreground hover:text-foreground"
            >
              Clear selection
            </button>
          )}
        </div>
      )}

      <div
        className="
          overflow-hidden
          rounded-xl
          border
          bg-background
          shadow-sm
          sm:rounded-2xl
        "
      >
        <ReviewQuestion
          word={current.content.word}
        />

        {!showAnswer ? (
          <div className="flex justify-center p-6 sm:p-10">
            <Button
              size="lg"
              className="h-11 w-full sm:h-12 sm:w-auto sm:px-12"
              disabled={ratingLoading}
              onClick={() =>
                setShowAnswer(true)
              }
            >
              <Eye className="mr-2 h-4 w-4" />
              Show Answer
            </Button>
          </div>
        ) : (
          <>
            <ReviewAnswer
              vocabulary={current.content}
              usageList={usageList}
              ratingLoading={ratingLoading}
            />

            <ReviewRatingButtons
              previews={previews}
              ratingLoading={ratingLoading}
              onRate={rate}
            />
          </>
        )}
      </div>
    </div>
  );
}