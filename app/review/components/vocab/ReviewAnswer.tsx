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
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-[0.85fr_1.7fr_0.5fr]
        md:divide-x
      "
    >
    {/* Meaning */}
<div className="p-5 sm:p-7">
  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:text-sm">
    Nghĩa
  </h3>

  <div
    className="
      mt-3
      flex
      min-h-[125px]
      flex-col
      justify-center
      rounded-2xl
      bg-muted/50
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

  {vocabulary.note && (
    <ReviewNote
      vocabulary={vocabulary}
      ratingLoading={ratingLoading}
    />
  )}
</div>
 {/* Expressions */}
    
      <ReviewExpressions
    
        vocabulary={vocabulary}
      />
      {/* Kanji */}
      <ReviewKanji vocabulary={vocabulary} />

     
    </div>
  );
}