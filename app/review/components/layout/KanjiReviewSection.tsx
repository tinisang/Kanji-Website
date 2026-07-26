"use client";

import { useEffect, useMemo, useState } from "react";

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { getReviewCards } from "../../clients/review.client";
import { ReviewMode } from "../../lib/repositories/review.repository";
import { ReviewCard } from "../../lib/types/reviewCard";

import VocabularyReview from "../ReviewCard";
import ReviewVocabularyCard from "../ReviewVocabularyCard";

export default function KanjiReviewSection() {
  const [mode, setMode] =
    useState<ReviewMode>("review");

  const [shuffle, setShuffle] =
    useState(false);

  const [reviews, setReviews] = useState<
    ReviewCard<any>[]
  >([]);

  const [cards, setCards] = useState<
    ReviewCard<any>[]
  >([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    loadReviews();
  }, []);

  useEffect(() => {
    loadCards();
  }, [mode]);

  async function loadReviews() {
  setLoading(true);

  const data = (
    await getReviewCards({
      mode: "practice",
      type: "kanji",
    })
  ).filter(
    (
      card
    ): card is typeof card & {
      content: NonNullable<
        typeof card.content
      >;
    } => card.content != null
  );

  setReviews(data);
  setLoading(false);
}

async function loadCards() {
  setLoading(true);

  const data = (
    await getReviewCards({
      mode,
      type: "kanji",
    })
  ).filter(
    (
      card
    ): card is typeof card & {
      content: NonNullable<
        typeof card.content
      >;
    } => card.content != null
  );

  setCards(data);
  setLoading(false);
}

 

  const displayCards = useMemo(() => {
    if (!shuffle) {
      return cards;
    }

    return [...cards]
      .map((card) => ({
        card,
        sort: Math.random(),
      }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ card }) => card);
  }, [cards, shuffle]);

  const grouped = useMemo(
    () => ({
      new: reviews.filter(
        (r) =>
          r.progress.state === "new"
      ),
      learning: reviews.filter(
        (r) =>
          r.progress.state ===
          "learning"
      ),
      review: reviews.filter(
        (r) =>
          r.progress.state ===
          "review"
      ),
      relearning: reviews.filter(
        (r) =>
          r.progress.state ===
          "relearning"
      ),
    }),
    [reviews]
  );



  if (reviews.length === 0) {
    return (
      <div className="rounded-xl border border-dashed py-12 text-center text-muted-foreground">
        No cards to review 🎉
      </div>
    );
  }

  return (
    <section
  className={`rounded-2xl border bg-white p-6 transition-opacity duration-200 ${
    loading
      ? "opacity-50 pointer-events-none"
      : "opacity-100"
  }`}
>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">
            Kanji Review
          </h2>

          <p className="text-sm text-muted-foreground">
            {cards.length} cards
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Tabs
            value={mode}
            onValueChange={(value) =>
              setMode(
                value as ReviewMode
              )
            }
          >
            <TabsList>
              <TabsTrigger value="review">
                Review
              </TabsTrigger>

              <TabsTrigger value="new">
                New
              </TabsTrigger>

              <TabsTrigger value="practice">
                Practice
              </TabsTrigger>

              <TabsTrigger value="cram">
                Cram
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Switch
              id="shuffle"
              checked={shuffle}
              onCheckedChange={
                setShuffle
              }
            />

            <Label htmlFor="shuffle">
              Shuffle
            </Label>
          </div>
        </div>
      </div>

      <VocabularyReview
        cards={displayCards}
      />

      <div className="mt-6 grid grid-cols-4 gap-4">
  {[
    {
      key: "new",
      title: "🆕 New",
      items: grouped.new,
      className:
        "border-sky-200 bg-sky-50",
    },
    {
      key: "learning",
      title: "📖 Learning",
      items: grouped.learning,
      className:
        "border-amber-200 bg-amber-50",
    },
    {
      key: "review",
      title: "✅ Reviewing",
      items: grouped.review,
      className:
        "border-emerald-200 bg-emerald-50",
    },
    {
      key: "relearning",
      title: "🔄 Relearning",
      items: grouped.relearning,
      className:
        "border-rose-200 bg-rose-50",
    },
  ].map((group) => (
    <div
      key={group.key}
      className={`rounded-xl border p-3 ${group.className}`}
    >
      <h3 className="mb-3 font-semibold">
        {group.title} (
        {group.items.length})
      </h3>

      <div className="space-y-2">
        {group.items.map(
          ({
            item,
            progress,
            content,
          }) => (
            <ReviewVocabularyCard
              key={item.id}
              vocabulary={content}
              progress={progress}
            />
          )
        )}
      </div>
    </div>
  ))}
</div>
    </section>
  );
}