"use client";

import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import VocabularyReview from "../VocabularyReview";

export default function VocabularyReviewSection() {


  const [loading, setLoading] = useState(false);

  

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
          

           
          </div>

          {/* Go to Kanji */}
          <Link
            href="/kanji"
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

            <span>Go to Kanji</span>

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
       
      </div>

      <VocabularyReview type="kanji" />
    </section>
  );
}