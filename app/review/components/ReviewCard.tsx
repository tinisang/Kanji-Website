"use client";

import { useMemo, useState } from "react";
import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Vocabulary } from "@/app/vocabulary/lib/types/vocabulary";
import { ReviewCard } from "../lib/types/reviewCard";
import { ReviewRating } from "../lib/types/reviewType";
import { submitReview } from "../clients/review.client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


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
  const [showAnswer, setShowAnswer] =
    useState(false);

  const current = useMemo(
    () => cards[index],
    [cards, index]
  );

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

  async function rate(
  rating: ReviewRating
) {
  await submitReview(
    current.item.id,
    rating
  );

  setShowAnswer(false);
  setIndex((i) => i + 1);
}

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
              width: `${
                ((index + 1) / cards.length) *
                100
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

                {current.content.note && (
  <Dialog>
    <DialogTrigger asChild>
      <Button
        variant="outline"
        size="sm"
      >
        View Note
      </Button>
    </DialogTrigger>

    <DialogContent className="!max-w-4xl">
      <DialogHeader>
        <DialogTitle asChild>
          <h3>

          {current.content.word}
          </h3>
        </DialogTitle>
      </DialogHeader>

      <div
        className="prose prose-neutral max-h-[70vh]  overflow-y-auto"
        dangerouslySetInnerHTML={{
          __html: current.content.note,
        }}
      />
    </DialogContent>
  </Dialog>
)}
              </div>

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