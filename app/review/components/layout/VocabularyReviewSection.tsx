"use client";

import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";

import { getReviewCards } from "../../clients/review.client";
import { ReviewMode } from "../../lib/repositories/review.repository";
import { ReviewCard } from "../../lib/types/reviewCard";

import VocabularyReview from "../VocabularyReview";

export default function VocabularyReviewSection() {
  const [mode, setMode] =
    useState<ReviewMode>("review");

  const [cards, setCards] =
    useState<ReviewCard<any>[]>([]);

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
          type: "vocabulary",
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

  return (
    <section
      className={`
        rounded-2xl border bg-white
        p-4 sm:p-6
        transition-opacity duration-200
        ${
          loading
            ? "pointer-events-none opacity-50"
            : "opacity-100"
        }
      `}
    >
      <div className="mb-5">
        {/* Header */}
        <div
          className="
            flex flex-col gap-4
            sm:flex-row sm:items-center
            sm:justify-between
          "
        >
          <div className="min-w-0">
            <h2 className="text-xl font-bold">
              Vocabulary Review
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {cards.length} cards
            </p>
          </div>

          {/* Go to Vocabulary */}
          <Link
            href="/vocabulary"
            className="
              group inline-flex w-full
              items-center justify-center gap-2
              rounded-xl border bg-zinc-50
              px-3 py-2.5
              text-sm font-semibold text-zinc-700
              transition-all
              hover:border-emerald-300
              hover:bg-emerald-50
              hover:text-emerald-700
              sm:w-fit sm:px-4 sm:py-2
            "
          >
            <BookOpen className="h-4 w-4 shrink-0" />

            <span>Go to Vocabulary</span>

            <ArrowRight
              className="
                h-4 w-4 shrink-0
                transition-transform
                group-hover:translate-x-0.5
              "
            />
          </Link>
        </div>
      </div>

      <VocabularyReview type="vocabulary" />
    </section>
  );
}