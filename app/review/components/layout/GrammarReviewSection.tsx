"use client";

import Link from "next/link";
import { ArrowRight, BookOpenText } from "lucide-react";
import GrammarReview from "../GrammarReview";


export default function GrammarReviewSection() {
  return (
    <section
      className="
        rounded-2xl border bg-white
        p-4 sm:p-6
      "
    >
      <div className="mb-5 flex flex-col gap-4">
        {/* Header */}
        <div
          className="
            flex flex-col gap-3
            sm:flex-row sm:items-center
            sm:justify-between
          "
        >
          <div>
            <h2 className="text-lg font-bold text-zinc-900">
              Grammar Review
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Review the grammar points you marked for revision.
            </p>
          </div>

          {/* Go to Grammar */}
          <Link
            href="/grammar"
            className="
              group
              inline-flex w-fit
              items-center gap-2
              rounded-xl border
              bg-zinc-50
              px-3 py-2
              text-sm font-semibold
              text-zinc-700
              transition-all
              hover:border-emerald-300
              hover:bg-emerald-50
              hover:text-emerald-700
              sm:px-4
            "
          >
            <BookOpenText className="h-4 w-4" />

            <span>Go to Grammar</span>

            <ArrowRight
              className="
                h-4 w-4
                transition-transform
                group-hover:translate-x-0.5
              "
            />
          </Link>
        </div>
      </div>

      <GrammarReview type="grammar" />
    </section>
  );
}