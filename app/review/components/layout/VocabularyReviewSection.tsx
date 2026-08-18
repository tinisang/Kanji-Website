"use client";

import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
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

export default function VocabularyReviewSection() {
  const [mode, setMode] = useState<ReviewMode>("review");
  const [shuffle, setShuffle] = useState(false);
  const [cards, setCards] = useState<ReviewCard<any>[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCards();
  }, [mode]);

  async function loadCards() {
    setLoading(true);

    try {
      const data = (
        await getReviewCards({
          mode,
          type: "vocabulary",
        })
      ).filter(
        (
          card
        ): card is typeof card & {
          content: NonNullable<typeof card.content>;
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
        No vocabulary to review 🎉
      </div>
    );
  }

  return (
    <section
      className={`
        rounded-2xl border bg-white
        p-4 sm:p-6
        transition-opacity duration-200
        ${loading ? "pointer-events-none opacity-50" : "opacity-100"}
      `}
    >
      <div className="mb-5 flex flex-col gap-4">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold">
              Vocabulary Review
            </h2>

            <p className="text-sm text-muted-foreground">
              {cards.length} cards
            </p>
          </div>

          {/* Go to Vocabulary */}
          <Link
            href="/vocabulary"
            className="
              group
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-xl
              border
              bg-zinc-50
              px-3
              py-2
              text-sm
              font-semibold
              text-zinc-700
              transition-all
              hover:border-emerald-300
              hover:bg-emerald-50
              hover:text-emerald-700
              sm:px-4
            "
          >
            <BookOpen className="h-4 w-4" />

            <span>Go to Vocabulary</span>

            <ArrowRight
              className="
                h-4 w-4
                transition-transform
                group-hover:translate-x-0.5
              "
            />
          </Link>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Tabs
            value={mode}
            onValueChange={(value) =>
              setMode(value as ReviewMode)
            }
            className="w-full sm:w-auto"
          >
            <TabsList className="grid w-full grid-cols-4 sm:flex sm:w-auto">
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
              id="vocabulary-shuffle"
              checked={shuffle}
              onCheckedChange={setShuffle}
            />

            <Label htmlFor="vocabulary-shuffle">
              Shuffle
            </Label>
          </div>
        </div>
      </div>

      <VocabularyReview cards={displayCards} />
    </section>
  );
}