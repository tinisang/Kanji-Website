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

import VocabularyReview from "../VocabularyReview";

export default function KanjiReviewSection() {
  const [mode, setMode] =
    useState<ReviewMode>("review");

  const [shuffle, setShuffle] =
    useState(false);

  const [cards, setCards] = useState<
    ReviewCard<any>[]
  >([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    loadCards();
  }, [mode]);

  async function loadCards() {
    setLoading(true);

    try {
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
    } finally {
      setLoading(false);
    }
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

  if (cards.length === 0 && !loading) {
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
          ? "pointer-events-none opacity-50"
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
              setMode(value as ReviewMode)
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
              onCheckedChange={setShuffle}
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
    </section>
  );
}