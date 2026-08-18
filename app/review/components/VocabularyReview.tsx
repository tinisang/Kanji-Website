"use client";

import { useEffect, useMemo, useState } from "react";
import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Vocabulary } from "@/app/vocabulary/lib/types/vocabulary";
import { ReviewCard } from "../lib/types/reviewCard";
import { ReviewRating } from "../lib/types/reviewType";
import { submitReview } from "../clients/review.client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Usage } from "@/app/vocabulary/lib/types/Usage";
import { getUsagesByVocabularyId } from "@/app/vocabulary/features/vocabulary_deck/clients/vocabularyExpressionClient";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  cards: ReviewCard<Vocabulary>[];
  onRate?: (
    reviewItemId: string,
    rating: ReviewRating
  ) => Promise<void>;
}

export default function VocabularyReview({
  cards,
  onRate,
}: Props) {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [usages, setUsages] = useState<Record<string, Usage>>({});

  const current = useMemo(
    () => cards[index],
    [cards, index]
  );

  const vocabId = current?.content?.id;

  useEffect(() => {
    if (!vocabId) {
      setUsages({});
      return;
    }

    async function loadUsages() {
      try {
        const data = await getUsagesByVocabularyId(vocabId);
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

  if (!current) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center sm:h-[70vh]">
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

  async function rate(rating: ReviewRating) {
    setShowAnswer(false);
    setUsages({});
    setIndex((i) => i + 1);

    if (onRate) {
      await onRate(current.item.id, rating);
    } else {
      await submitReview(
        current.item.id,
        rating
      );
    }
  }

  const usageList = Object.values(usages);

  return (
    <div className="mx-auto flex min-h-[65vh] max-w-5xl flex-col sm:min-h-[75vh]">
      {/* Progress */}
      <div className="mb-5 sm:mb-8">
        <div className="mb-2 flex justify-between text-xs text-muted-foreground sm:text-sm">
          <span>
            {index + 1} / {cards.length}
          </span>

          <span>
            {cards.length - index - 1} remaining
          </span>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-neutral-200 sm:h-2">
          <div
            className="h-full rounded-full bg-black transition-all"
            style={{
              width: `${
                ((index + 1) / cards.length) * 100
              }%`,
            }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full rounded-2xl border bg-white p-5 shadow-sm sm:rounded-3xl sm:p-8 md:p-12">
          {/* Question */}
          <div className="text-center">
            <div className="break-words text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              {current.content.word}
            </div>
          </div>

          {/* Show Answer */}
          {!showAnswer ? (
            <div className="mt-10 flex justify-center sm:mt-14">
              <Button
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => setShowAnswer(true)}
              >
                <Eye className="mr-2 h-4 w-4" />
                Show Answer
              </Button>
            </div>
          ) : (
            <>
              <div className="mt-8 border-t pt-7 sm:mt-12 sm:pt-10">
                <div className="text-center">
                  {current.content.reading && (
                    <div className="mt-2 text-xl text-muted-foreground sm:mt-4 sm:text-2xl">
                      {current.content.reading}
                    </div>
                  )}

                  <div className="mt-2 break-words text-2xl font-semibold sm:text-3xl">
                    {current.content.meaning}
                  </div>
                </div>

                {(current.content.note ||
                  usageList.length > 0) && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="mt-5 flex justify-center sm:mt-6">
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          View Note
                        </Button>
                      </div>
                    </DialogTrigger>

                    <DialogContent className="w-[calc(100%-2rem)] max-w-4xl rounded-xl sm:w-full">
                      <DialogHeader>
                        <DialogTitle>
                          {current.content.word}
                        </DialogTitle>
                      </DialogHeader>

                      <div className="max-h-[70vh] overflow-y-auto">
                        {/* Note */}
                        {current.content.note && (
                          <div
                            className="prose prose-neutral max-w-none text-sm sm:text-base"
                            dangerouslySetInnerHTML={{
                              __html:
                                current.content.note,
                            }}
                          />
                        )}

                        {/* Expressions */}
                        {usageList.length > 0 && (
                          <div className="mt-6 border-t pt-5 sm:mt-8 sm:pt-6">
                            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                              Expressions
                            </h4>

                            <Accordion
                              type="multiple"
                              className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3"
                            >
                              {usageList.map((usage) => {
                                const expression =
                                  usage.expression.word;

                                const word =
                                  current.content.word;

                                const expressionIndex =
                                  expression.indexOf(word);

                                const examples =
                                  Object.values(
                                    usage.examples
                                  );

                                return (
                                  <AccordionItem
                                    key={
                                      usage.expression.id
                                    }
                                    value={
                                      usage.expression.id
                                    }
                                    className="rounded-2xl border bg-muted/20 px-4 data-[state=open]:bg-muted/30 sm:px-5"
                                  >
                                    <AccordionTrigger className="py-3 hover:no-underline sm:py-4">
                                      <div className="flex w-full min-w-0 flex-col items-start">
                                        <div className="flex w-full min-w-0 items-center gap-2">
                                          {examples.length >
                                            0 && (
                                            <span className="h-2 w-2 shrink-0 rounded-full bg-red-500" />
                                          )}

                                          <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
                                            <div className="break-all text-lg font-bold tracking-tight sm:text-xl">
                                              {expressionIndex ===
                                              -1 ? (
                                                expression
                                              ) : (
                                                <>
                                                  {expression.slice(
                                                    0,
                                                    expressionIndex
                                                  )}

                                                  <span className="text-gray-400">
                                                    {expression.slice(
                                                      expressionIndex,
                                                      expressionIndex +
                                                        word.length
                                                    )}
                                                  </span>

                                                  {expression.slice(
                                                    expressionIndex +
                                                      word.length
                                                  )}
                                                </>
                                              )}
                                            </div>

                                            {usage
                                              .expression
                                              .reading && (
                                              <span className="text-xs font-normal text-muted-foreground sm:text-sm">
                                                {
                                                  usage
                                                    .expression
                                                    .reading
                                                }
                                              </span>
                                            )}
                                          </div>
                                        </div>

                                        {usage.expression
                                          .meaning && (
                                          <div className="mt-1 ml-4 text-left text-xs font-medium text-muted-foreground sm:text-sm">
                                            {
                                              usage
                                                .expression
                                                .meaning
                                            }
                                          </div>
                                        )}
                                      </div>
                                    </AccordionTrigger>

                                    <AccordionContent className="pb-4 sm:pb-5">
                                      {examples.length > 0 ? (
                                        <div className="space-y-3 border-t pt-4">
                                          {examples.map(
                                            (example) => (
                                              <div
                                                key={
                                                  example.id
                                                }
                                                className="rounded-lg bg-background/60 p-3"
                                              >
                                                <div className="text-sm leading-relaxed">
                                                  <div className="break-words font-medium">
                                                    {
                                                      example.example
                                                    }
                                                  </div>
                                                </div>

                                                {example.meaning && (
                                                  <div className="mt-1 text-sm text-muted-foreground">
                                                    {
                                                      example.meaning
                                                    }
                                                  </div>
                                                )}
                                              </div>
                                            )
                                          )}
                                        </div>
                                      ) : (
                                        <div className="border-t pt-4 text-sm text-muted-foreground">
                                          No examples.
                                        </div>
                                      )}
                                    </AccordionContent>
                                  </AccordionItem>
                                );
                              })}
                            </Accordion>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>

              {/* Rating */}
              <div className="mt-7 grid grid-cols-2 gap-2 sm:mt-10 sm:grid-cols-4 sm:gap-3">
                <Button
                  variant="destructive"
                  className="h-11"
                  onClick={() => rate(1)}
                >
                  Again
                </Button>

                <Button
                  variant="secondary"
                  className="h-11"
                  onClick={() => rate(2)}
                >
                  Hard
                </Button>

                <Button
                  className="h-11 bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => rate(3)}
                >
                  Good
                </Button>

                <Button
                  className="h-11"
                  onClick={() => rate(4)}
                >
                  Easy
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}