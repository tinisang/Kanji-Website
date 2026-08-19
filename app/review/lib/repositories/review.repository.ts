import { getCurrentUserId } from "@/lib/auth/auth-user";
import { sql } from "@/lib/db";

import { ReviewHistory } from "../types/reviewHistory";
import { ReviewItem } from "../types/reviewItem";
import { ReviewProgress } from "../types/reviewProgress";
import { ReviewType } from "../types/reviewType";

/* -------------------------------------------------------------------------- */
/*                                 Review Item                                */
/* -------------------------------------------------------------------------- */

export async function getReviewItems(
  type: ReviewType
) {
  const userId = await getCurrentUserId();

  const rows = await sql`
    SELECT *
    FROM review_item
    WHERE
      user_id = ${userId}
      AND type = ${type}
      AND archived = FALSE
    ORDER BY created_at DESC;
  `;

  return rows as ReviewItem[];
}

export async function getReviewItemById(
  reviewItemId: string
) {
  const userId = await getCurrentUserId();

  const rows = await sql`
    SELECT *
    FROM review_item
    WHERE
      id = ${reviewItemId}
      AND user_id = ${userId};
  `;

  return rows[0] as ReviewItem | undefined;
}


export async function createReviewItem(
  item: Omit<
    ReviewItem,
    "id" | "user_id" | "created_at"
  >
) {
  const userId = await getCurrentUserId();

  const rows = await sql`
    INSERT INTO review_item (
      user_id,
      type,
      target_id,
      archived
    )
    VALUES (
      ${userId},
      ${item.type},
      ${item.target_id},
      ${item.archived}
    )
    RETURNING *;
  `;

  return rows[0] as ReviewItem;
}

export async function archiveReviewItem(
  reviewItemId: string
) {
  const userId = await getCurrentUserId();

  await sql`
    UPDATE review_item
    SET archived = TRUE
    WHERE
      id = ${reviewItemId}
      AND user_id = ${userId};
  `;
}

export async function deleteReviewItem(
  reviewItemId: string
) {
  const userId = await getCurrentUserId();

  await sql`
    DELETE FROM review_item
    WHERE
      id = ${reviewItemId}
      AND user_id = ${userId};
  `;
}

/* -------------------------------------------------------------------------- */
/*                               Review Progress                              */
/* -------------------------------------------------------------------------- */



export async function getDueReviewProgress(
  type: ReviewType
) {
  return await sql`
    SELECT rp.*
    FROM review_progress rp
    JOIN review_item ri
      ON ri.id = rp.review_item_id
    WHERE
      ri.type = ${type}
      AND ri.archived = FALSE
      AND rp.due_at <= NOW()
    ORDER BY rp.due_at;
  `;
}

export async function createReviewProgress(
  progress: Omit<
    ReviewProgress,
    "created_at" | "updated_at"
  >
) {
  const rows = await sql`
    INSERT INTO review_progress (
      review_item_id,
      state,
      due_at,
      last_reviewed_at,
      repetitions,
      lapses,
      stability,
      difficulty
    )
    VALUES (
      ${progress.review_item_id},
      ${progress.state},
      ${progress.due_at},
      ${progress.last_reviewed_at},
      ${progress.repetitions},
      ${progress.lapses},
      ${progress.stability},
      ${progress.difficulty}
    )
    RETURNING *;
  `;

  return rows[0] as ReviewProgress;
}

export async function updateReviewProgress(
  progress: ReviewProgress
) {
  const rows = await sql`
    UPDATE review_progress
    SET
      state = ${progress.state},
      due_at = ${progress.due_at},
      last_reviewed_at = ${progress.last_reviewed_at},
      repetitions = ${progress.repetitions},
      lapses = ${progress.lapses},
      stability = ${progress.stability},
      difficulty = ${progress.difficulty},
      updated_at = NOW()
    WHERE review_item_id = ${progress.review_item_id}
    RETURNING *;
  `;

  return rows[0] as ReviewProgress;
}

/* -------------------------------------------------------------------------- */
/*                               Review History                               */
/* -------------------------------------------------------------------------- */

export async function getReviewHistory(
  reviewItemId: string
) {
  const rows = await sql`
    SELECT *
    FROM review_history
    WHERE review_item_id = ${reviewItemId}
    ORDER BY reviewed_at DESC;
  `;

  return rows as ReviewHistory[];
}

export async function createReviewHistory(
  history: Omit<ReviewHistory, "id">
) {
  const rows = await sql`
    INSERT INTO review_history (
      review_item_id,
      rating,
      reviewed_at,
      elapsed_days,
      scheduled_days,
      response_time_ms
    )
    VALUES (
      ${history.review_item_id},
      ${history.rating},
      ${history.reviewed_at},
      ${history.elapsed_days},
      ${history.scheduled_days},
      ${history.response_time_ms}
    )
    RETURNING *;
  `;

  return rows[0] as ReviewHistory;
}



export type ReviewMode =
  | "review"
  | "new"
  | "practice"
  | "cram";

export interface GetReviewProgressOptions {
  mode: ReviewMode;
  type: ReviewType;

  folderId?: string;
  referenceSetId?: string;

  limit?: number;
}
export async function getReviewProgressByItemId(
  reviewItemId: string
): Promise<ReviewProgress | undefined> {
  const rows = await sql`
    SELECT *
    FROM review_progress
    WHERE review_item_id = ${reviewItemId};
  `;

  return rows[0] as ReviewProgress | undefined;
}
export async function getNextDueReviewProgress(
  type: ReviewType
): Promise<ReviewProgress | undefined> {
  const rows = await sql`
    SELECT rp.*
    FROM review_progress rp
    JOIN review_item ri
      ON ri.id = rp.review_item_id
    WHERE
      ri.type = ${type}
      AND ri.archived = FALSE
      AND rp.due_at <= NOW()
    ORDER BY
      CASE
        WHEN rp.state IN ('learning', 'relearning') THEN 0
        WHEN rp.state = 'review' THEN 1
        WHEN rp.state = 'new' THEN 2
        ELSE 3
      END,
      rp.due_at ASC
    LIMIT 1;
  `;

  return rows[0] as ReviewProgress | undefined;
}
export async function getReviewItemByTarget(
  type: ReviewType,
  targetId: string
): Promise<ReviewItem | undefined> {
  const rows = await sql`
    SELECT *
    FROM review_item
    WHERE type = ${type}
      AND target_id = ${targetId}
      AND archived = false
    LIMIT 1
  `;

  return rows[0] as ReviewItem | undefined;
}

export async function getReviewProgress({
  mode,
  type,
  folderId,
  referenceSetId,
  limit = 11111150,
}: GetReviewProgressOptions): Promise<
  ReviewProgress[]
> {
  switch (mode) {
    case "review": {
      const rows = await sql`
        SELECT rp.*
        FROM review_progress rp
        JOIN review_item ri
          ON ri.id = rp.review_item_id
        WHERE
          ri.type = ${type}
          AND ri.archived = FALSE
          AND rp.due_at <= NOW()
        ORDER BY rp.due_at;
      `;

      return rows as ReviewProgress[];
    }

    case "new": {
      const rows = await sql`
        SELECT rp.*
        FROM review_progress rp
        JOIN review_item ri
          ON ri.id = rp.review_item_id
        WHERE
          ri.type = ${type}
          AND ri.archived = FALSE
          AND rp.state = 'new'
        ORDER BY rp.created_at
        LIMIT ${limit};
      `;

      return rows as ReviewProgress[];
    }

    case "practice": {
      const rows = await sql`
        SELECT rp.*
        FROM review_progress rp
        JOIN review_item ri
          ON ri.id = rp.review_item_id
        WHERE
          ri.type = ${type}
          AND ri.archived = FALSE
        ORDER BY rp.updated_at DESC
        LIMIT ${limit};
      `;

      return rows as ReviewProgress[];
    }

    case "cram": {
      const rows = await sql`
        SELECT rp.*
        FROM review_progress rp
        JOIN review_item ri
          ON ri.id = rp.review_item_id
        WHERE
          ri.type = ${type}
          AND ri.archived = FALSE
        ORDER BY RANDOM()
        LIMIT ${limit};
      `;

      return rows as ReviewProgress[];
    }
  }
}

export async function deleteReviewItemByTarget(
  type: ReviewType,
  targetId: string
) {
  await sql`
    DELETE FROM review_item
    WHERE type = ${type}
      AND target_id = ${targetId};
  `;
}