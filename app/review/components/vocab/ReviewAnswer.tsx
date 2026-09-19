"use client";

import { Vocabulary } from "@/app/vocabulary/lib/types/vocabulary";
import { Usage } from "@/app/vocabulary/lib/types/Usage";
import ReviewNote from "./ReviewNote";
import ReviewKanji from "./ReviewKanji";
import ReviewExpressions from "./ReviewExpressions";
import VocabUsages from "@/app/vocabulary/features/vocabulary_deck/components/VocabUsages";



interface Props {
  vocabulary: Vocabulary;
  usageList: Usage[];
  ratingLoading: boolean;
}

export default function ReviewAnswer({
  vocabulary,
  usageList,
  ratingLoading,
}: Props) {
  return (
    <div>
      {/* Meaning */}
      <div className="p-5 sm:p-7 grid  gap-2 bg-emerald-50/80">
        <div className="flex flex-col">
      
        <div
          className="
    
      flex
      flex-1
      min-h-[125px]
      flex-col
      
      rounded-2xl
      bg-emerald-100
      px-5
      py-4
      sm:px-6
    "
        >
          {/* Reading */}
          {vocabulary.reading && (
            <div className="break-words text-base font-medium text-muted-foreground sm:text-lg">
              {vocabulary.reading}
            </div>
          )}

          {/* Meaning */}
          <div
            className="
        mt-1.5
        break-words
        text-xl
        font-semibold
        leading-snug
        tracking-tight
        sm:text-2xl
      "
          >
            {vocabulary.meaning}
          </div>
        </div>
</div>
        {vocabulary.note && (
          <ReviewNote
            vocabulary={vocabulary}
            ratingLoading={ratingLoading}
          />
        )}
      </div>

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-[2fr_0.5fr]
        md:divide-x
      "
      >

        {/* Expressions */}

        <ReviewExpressions

          vocabulary={vocabulary}
        />
        {/* Kanji */}
        <ReviewKanji vocabulary={vocabulary} />


      </div>
    </div>
  );
}