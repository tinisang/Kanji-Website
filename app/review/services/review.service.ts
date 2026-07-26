

/* -------------------------------------------------------------------------- */
/*                                Dashboard                                   */
/* -------------------------------------------------------------------------- */

import { getKanjiById } from "@/app/kanji/lib/repositories/kanji.repository";
import { createReviewHistory, createReviewItem, createReviewProgress, deleteReviewItem, getDueReviewProgress, getReviewHistory, getReviewItemById, getReviewItemByTarget as getReviewItemByTargetRepository, getReviewProgress, getReviewProgressByItemId as getReviewProgressByItemIdRepository, GetReviewProgressOptions, updateReviewProgress } from "../lib/repositories/review.repository";
import { ReviewCard } from "../lib/types/reviewCard";
import { ReviewRating, ReviewType } from "../lib/types/reviewType";
import { getCurrentUserId } from "@/lib/auth/auth-user";
import { getVocabularyById } from "@/app/vocabulary/lib/repositories/vocabularyRepository";
import { getGrammarById } from "@/app/grammar/lib/repositories/grammarRepository";
import { ReviewProgress } from "../lib/types/reviewProgress";
import { createEmptyCard } from "ts-fsrs";
import { scheduleReview } from "./reviewScheduler";

export async function getReviewProgressByItemId(
  reviewItemId: string
): Promise<ReviewProgress | undefined> {
  return getReviewProgressByItemIdRepository(
    reviewItemId
  );
}

export async function getReviewCards(
  options: GetReviewProgressOptions
): Promise<ReviewCard<any>[]> {
  const user_id = await getCurrentUserId();

  const progresses =
    await getReviewProgress(options);

  const cards = await Promise.all(
    progresses.map(async (progress) => {
      const item = await getReviewItemById(
        progress.review_item_id
      );

      if (!item) return null;

      let content;

      switch (item.type) {
        case "kanji":
          content = await getVocabularyById(
            user_id,
            item.target_id
          );
          break;

        case "vocabulary":
          content = await getVocabularyById(
            user_id,
            item.target_id
          );
          break;

        case "grammar":
          content = await getGrammarById(
            item.target_id
          );
          break;
      }

      return {
        item,
        progress,
        content,
      };
    })
  );

  return cards.filter(
    (
      card
    ): card is ReviewCard<any> => card !== null
  );
}

export async function getTodayReviewCards(
  type: ReviewType
): Promise<ReviewCard<any>[]> {

    const user_id = await getCurrentUserId();
  const progresses =
    await getDueReviewProgress(type);

  const cards = await Promise.all(
    progresses.map(async (progress) => {
      const item = await getReviewItemById(
        progress.review_item_id
      );

      if (!item) return null;

      let content;

      switch (item.type) {
        case "kanji":
          content = await getVocabularyById(
            user_id,
            item.target_id
          );
          break;

        case "vocabulary":
          content =
            await getVocabularyById(
                user_id,
              item.target_id
            );
          break;

        case "grammar":
          content = await getGrammarById(
            item.target_id
          );
          break;
      }

      return {
        item,
        progress,
        content,
      };
    })
  );

  return cards.filter(
    (
      card
    ): card is ReviewCard<any> => card !== null
  );
}


/* -------------------------------------------------------------------------- */
/*                              Add / Remove                                  */
/* -------------------------------------------------------------------------- */

export async function addToReview(
  type: ReviewType,
  targetId: string
) {
  const existed =
    await getReviewItemByTargetRepository(
      type,
      targetId
    );

  if (existed) return existed;

  const item = await createReviewItem({
    type,
    target_id: targetId,
    archived: false,
  });
const card = createEmptyCard(new Date());

await createReviewProgress({
  review_item_id: item.id,
  state: "new",
  due_at: card.due.toISOString(),
  last_reviewed_at: null,
  repetitions: card.reps,
  lapses: card.lapses,
  stability: card.stability,
  difficulty: card.difficulty,
});

  return item;
}

export async function removeFromReview(
  reviewItemId: string
) {
  await deleteReviewItem(reviewItemId);
}

/* -------------------------------------------------------------------------- */
/*                                 Review                                     */
/* -------------------------------------------------------------------------- */

export async function submitReview(
  reviewItemId: string,
  rating: ReviewRating,
  responseTimeMs?: number
) {
  const progress =
    await getReviewProgressByItemId(
      reviewItemId
    );

  if (!progress) {
    throw new Error("Review progress not found.");
  }

  const nextProgress = scheduleReview(
    progress,
    rating
  );

  await updateReviewProgress(nextProgress);

  await createReviewHistory({
    review_item_id: reviewItemId,
    rating,
    reviewed_at: new Date().toISOString(),
    elapsed_days: 0,
    scheduled_days: 0,
    response_time_ms: responseTimeMs ?? null,
  });

  return nextProgress;
}
export async function getReviewItemByTarget(
  type: ReviewType,
  targetId: string
) {
  return getReviewItemByTargetRepository(
    type,
    targetId
  );
}
/* -------------------------------------------------------------------------- */
/*                                 History                                    */
/* -------------------------------------------------------------------------- */

export async function getHistory(
  reviewItemId: string
) {
  return getReviewHistory(reviewItemId);
}

function calculateNextReview(progress: ReviewProgress, rating: string) {
    throw new Error("Function not implemented.");
}
import {
  deleteReviewItemByTarget as deleteReviewItemByTargetRepository,

} from "../lib/repositories/review.repository";
export async function deleteReviewItemByTarget(
  type: ReviewType,
  targetId: string
) {
  return deleteReviewItemByTargetRepository(
    type,
    targetId
  );
}