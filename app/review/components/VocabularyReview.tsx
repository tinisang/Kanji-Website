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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
      <div className="flex h-[70vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold">
            🎉 Finished
          </h2>

          <p className="mt-2 text-muted-foreground">
            No more cards to review.
          </p>
        </div>
      </div>
    );
  }

  async function rate(rating: ReviewRating) {
    await submitReview(
      current.item.id,
      rating
    );

    setShowAnswer(false);
    setUsages({});
    setIndex((i) => i + 1);
  }

  const usageList = Object.values(usages);

  return (
    <div className="mx-auto flex min-h-[75vh] max-w-5xl flex-col">
      {/* Progress */}

      <div className="mb-8">
        <div className="mb-2 flex justify-between text-sm text-muted-foreground">
          <span>
            {index + 1} / {cards.length}
          </span>

          <span>
            {cards.length - index - 1} remaining
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-neutral-200">
          <div
            className="h-full rounded-full bg-black transition-all"
            style={{
              width: `${((index + 1) / cards.length) * 100
                }%`,
            }}
          />
        </div>
      </div>

      {/* Card */}

      <div className="flex flex-1 items-center justify-center">
        <div className="w-full rounded-3xl border bg-white p-12 shadow-sm">
          <div className="text-center">
            <div className="text-7xl font-bold tracking-tight">
              {current.content.word}
            </div>
          </div>

          {!showAnswer ? (
            <div className="mt-14 flex justify-center">
              <Button
                size="lg"
                onClick={() => setShowAnswer(true)}
              >
                <Eye className="mr-2 h-4 w-4" />
                Show Answer
              </Button>
            </div>
          ) : (
            <>
              <div className="mt-12 border-t pt-10">
                <div className="text-center">
                  {current.content.reading && (
                    <div className="mt-4 text-2xl text-muted-foreground">
                      {current.content.reading}
                    </div>
                  )}

                  <div className="text-3xl font-semibold">
                    {current.content.meaning}
                  </div>
                </div>

                {(current.content.note ||
                  usageList.length > 0) && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-6"
                        >
                          View Note
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="!max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>
                            {current.content.word}
                          </DialogTitle>
                        </DialogHeader>

                        <div className="max-h-[70vh] overflow-y-auto">
                          {/* Note */}

                          {current.content.note && (
                            <div
                              className="prose prose-neutral"
                              dangerouslySetInnerHTML={{
                                __html:
                                  current.content.note,
                              }}
                            />
                          )}

                          {/* Expressions */}

                          {usageList.length > 0 && (
                            <div className="mt-8 border-t pt-6">
                              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                Expressions
                              </h4>

                              <Accordion
  type="multiple"
  className="grid grid-cols-3 gap-2"
>
  {usageList.map((usage) => {
    const expression = usage.expression.word;
    const word = current.content.word;
    const index = expression.indexOf(word);
    const examples = Object.values(usage.examples);

    return (
      <AccordionItem
        key={usage.expression.id}
        value={usage.expression.id}
        className="rounded-2xl border bg-muted/20 px-5 data-[state=open]:bg-muted/30"
      >
         <AccordionTrigger className="py-4 hover:no-underline">
  <div className="flex w-full flex-col items-start">
    <div className="flex items-center gap-2">
      {/* Red dot */}
      {examples.length > 0 && (
        <span className="h-2 w-2 shrink-0 rounded-full bg-red-500" />
      )}

      {/* Expression */}
      <div className="flex items-baseline gap-3">
        <div className="text-xl font-bold tracking-tight">
          {index === -1 ? (
            expression
          ) : (
            <>
              {expression.slice(0, index)}

              <span className="text-gray-400">
                {expression.slice(
                  index,
                  index + word.length
                )}
              </span>

              {expression.slice(index + word.length)}
            </>
          )}
        </div>

        {usage.expression.reading && (
          <span className="text-sm font-normal text-muted-foreground">
            {usage.expression.reading}
          </span>
        )}
      </div>
    </div>

    {usage.expression.meaning && (
      <div className="mt-1 ml-4 text-sm font-medium text-muted-foreground">
        {usage.expression.meaning}
      </div>
    )}
  </div>
</AccordionTrigger>

       <AccordionContent className="pb-5">
  {examples.length > 0 ? (
    <div className="space-y-3 border-t pt-4">
      {examples.map((example) => (
        <div
          key={example.id}
          className="rounded-lg bg-background/60 p-3"
        >
          {/* Example */}
          <div className="relative text-sm leading-relaxed">
           

            <div className="font-medium">
              {example.example}
            </div>
          </div>

          {/* Meaning */}
          {example.meaning && (
            <div className="mt-1  text-sm text-muted-foreground">
              {example.meaning}
            </div>
          )}
        </div>
      ))}
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

              <div className="mt-10 grid grid-cols-4 gap-3">
                <Button
                  variant="destructive"
                  onClick={() => rate(1)}
                >
                  Again
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => rate(2)}
                >
                  Hard
                </Button>

                <Button
                  className="bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => rate(3)}
                >
                  Good
                </Button>

                <Button
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