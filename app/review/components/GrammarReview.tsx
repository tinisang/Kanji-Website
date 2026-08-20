"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Grammar } from "@/app/grammar/lib/types/Grammar";
import { GrammarExpression } from "@/app/grammar/lib/types/GrammarExpression";

import { ReviewCard } from "../lib/types/reviewCard";
import {
  ReviewRating,
  ReviewType,
} from "../lib/types/reviewType";

import {
  getNextReviewCard,
  submitReview,
} from "../clients/review.client";

import { getReviewPreviews } from "../services/reviewScheduler";

import { getGrammarExpressions } from "@/app/grammar/features/grammar_decks/clients/grammarExpressionClient";
import GrammarReviewExpression from "./layout/GrammarReviewExpression";



interface Props {
  type: ReviewType;

  onRate?: (
    reviewItemId: string,
    rating: ReviewRating
  ) => Promise<void>;
}

function formatReviewTime(date: Date) {
  const diff = date.getTime() - Date.now();

  const minutes = Math.max(
    0,
    Math.round(diff / 60000)
  );

  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.round(minutes / 60);

  if (hours < 24) {
    return `${hours}h`;
  }

  const days = Math.round(hours / 24);

  if (days < 30) {
    return `${days}d`;
  }

  const months = Math.round(days / 30);

  if (months < 12) {
    return `${months}mo`;
  }

  return `${Math.round(months / 12)}y`;
}

export default function GrammarReview({
  type,
  onRate,
}: Props) {
  const [current, setCurrent] =
    useState<ReviewCard<Grammar> | null>(null);

  const [expressions, setExpressions] =
    useState<GrammarExpression[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [showAnswer, setShowAnswer] =
    useState(false);

  const [ratingLoading, setRatingLoading] =
    useState(false);

  async function loadNextCard() {
    try {
      setLoading(true);

      const card =
        await getNextReviewCard(type);

      setCurrent(card);
      setShowAnswer(false);
      setExpressions([]);

      if (!card?.content?.id) {
        return;
      }

      const data =
        await getGrammarExpressions(
          card.content.id
        );

      setExpressions(data);
    } catch (error) {
      console.error(
        "Failed to load grammar review card:",
        error
      );

      setCurrent(null);
      setExpressions([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNextCard();
  }, []);

  async function rate(
    rating: ReviewRating
  ) {
    if (ratingLoading || !current) {
      return;
    }

    try {
      setRatingLoading(true);

      const reviewItemId =
        current.item.id;

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
        "Failed to submit grammar review:",
        error
      );
    } finally {
      setRatingLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[45vh] items-center justify-center sm:min-h-[60vh]">
        <div className="text-sm text-muted-foreground">
          Loading...
        </div>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="flex min-h-[45vh] items-center justify-center px-4 sm:min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            🎉 Finished
          </h2>

          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            No more cards to review.
          </p>
        </div>
      </div>
    );
  }

  const previews = getReviewPreviews(
    current.progress
  );

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col">
      <div className="flex flex-1 items-center justify-center">
        <div
          className="
            w-full
            rounded-xl border bg-white
            p-4 shadow-sm
            sm:rounded-3xl sm:p-8
            md:p-12
          "
        >
          {/* Question */}
          <div
            className="
              flex min-h-[120px]
              items-center justify-center
              px-2 text-center
              sm:min-h-[180px]
            "
          >
            <div
              className="
                break-words
                text-4xl font-bold
                tracking-tight
                sm:text-5xl
                md:text-6xl
              "
            >
              {current.content.title}
            </div>
          </div>

          {/* Show Answer */}
          {!showAnswer ? (
            <div className="mt-6 flex justify-center sm:mt-10">
              <Button
                size="lg"
                className="
                  h-11 w-full
                  sm:h-12 sm:w-auto
                  sm:px-10
                "
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
              {/* Expressions */}
              <div
                className="
                  mt-6
                  border-t pt-6
                  sm:mt-10 sm:pt-10
                "
              >
                {expressions.length > 0 ? (
                  <div className="mx-auto w-full max-w-3xl">
                    <div className="divide-y rounded-xl border bg-zinc-50">
                      {expressions.map(
                        (expression) => (
                          <GrammarReviewExpression
                            key={expression.id}
                            expression={expression}
                            disabled={ratingLoading}
                          />
                        )
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-sm text-muted-foreground">
                    No expressions.
                  </div>
                )}
              </div>

              {/* Rating */}
              <div
                className="
                  mt-6
                  grid grid-cols-2 gap-2
                  sm:mt-10
                  sm:grid-cols-4 sm:gap-3
                "
              >
                <Button
                  variant="destructive"
                  className="
                    h-auto min-h-12
                    w-full py-2
                    sm:min-h-14
                  "
                  disabled={ratingLoading}
                  onClick={() => rate(1)}
                >
                  <div className="flex flex-col items-center leading-tight">
                    <span className="text-sm font-semibold sm:text-base">
                      Again
                    </span>

                    <span className="mt-0.5 text-[11px] font-normal opacity-70 sm:text-xs">
                      {formatReviewTime(
                        previews.again.card.due
                      )}
                    </span>
                  </div>
                </Button>

                <Button
                  variant="secondary"
                  className="
                    h-auto min-h-12
                    w-full py-2
                    sm:min-h-14
                  "
                  disabled={ratingLoading}
                  onClick={() => rate(2)}
                >
                  <div className="flex flex-col items-center leading-tight">
                    <span className="text-sm font-semibold sm:text-base">
                      Hard
                    </span>

                    <span className="mt-0.5 text-[11px] font-normal opacity-70 sm:text-xs">
                      {formatReviewTime(
                        previews.hard.card.due
                      )}
                    </span>
                  </div>
                </Button>

                <Button
                  className="
                    h-auto min-h-12
                    w-full py-2
                    bg-emerald-600
                    hover:bg-emerald-700
                    sm:min-h-14
                  "
                  disabled={ratingLoading}
                  onClick={() => rate(3)}
                >
                  <div className="flex flex-col items-center leading-tight">
                    <span className="text-sm font-semibold sm:text-base">
                      Good
                    </span>

                    <span className="mt-0.5 text-[11px] font-normal opacity-70 sm:text-xs">
                      {formatReviewTime(
                        previews.good.card.due
                      )}
                    </span>
                  </div>
                </Button>

                <Button
                  className="
                    h-auto min-h-12
                    w-full py-2
                    sm:min-h-14
                  "
                  disabled={ratingLoading}
                  onClick={() => rate(4)}
                >
                  <div className="flex flex-col items-center leading-tight">
                    <span className="text-sm font-semibold sm:text-base">
                      Easy
                    </span>

                    <span className="mt-0.5 text-[11px] font-normal opacity-70 sm:text-xs">
                      {formatReviewTime(
                        previews.easy.card.due
                      )}
                    </span>
                  </div>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}