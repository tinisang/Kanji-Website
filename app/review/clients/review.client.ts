import { GetReviewProgressOptions } from "../lib/repositories/review.repository";
import { ReviewCard } from "../lib/types/reviewCard";
import { ReviewHistory } from "../lib/types/reviewHistory";
import { ReviewItem } from "../lib/types/reviewItem";
import { ReviewProgress } from "../lib/types/reviewProgress";
import { ReviewRating, ReviewType } from "../lib/types/reviewType";

/* -------------------------------------------------------------------------- */
/*                                Dashboard                                   */
/* -------------------------------------------------------------------------- */

export async function getTodayReviewCards(
  type: ReviewType
) {
  const res = await fetch(
    `/review/api/cards?type=${type}`
  );

  if (!res.ok) {
    throw new Error(
      "Failed to get review cards."
    );
  }

  return (await res.json()) as ReviewCard<any>[];
}
export async function getReviewCards(
  options: GetReviewProgressOptions
): Promise<ReviewCard<any>[]> {
  const params = new URLSearchParams({
    mode: options.mode,
    type: options.type,
  });

  if (options.folderId) {
    params.set("folderId", options.folderId);
  }

  if (options.referenceSetId) {
    params.set(
      "referenceSetId",
      options.referenceSetId
    );
  }

  if (options.limit) {
    params.set(
      "limit",
      options.limit.toString()
    );
  }

  const res = await fetch(
    `/review/api/cards?${params.toString()}`
  );

  if (!res.ok) {
    throw new Error(
      "Failed to fetch review cards"
    );
  }

  return res.json();
}

export async function deleteReviewItemByTarget(
  type: ReviewType,
  targetId: string
) {
  const res = await fetch(
    "/review/api/item",
    {
      method: "DELETE",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        type,
        targetId,
      }),
    }
  );

  if (!res.ok) {
    throw new Error(
      "Failed to delete review item"
    );
  }
}

export async function getReviewProgressByItemId(
  reviewItemId: string
): Promise<ReviewProgress | undefined> {
  const res = await fetch(
    `/review/api/progress/${reviewItemId}`
  );

  if (!res.ok) {
    throw new Error(
      "Failed to get review progress."
    );
  }

  return (await res.json()) as
    | ReviewProgress
    | undefined;
}
/* -------------------------------------------------------------------------- */
/*                              Add / Remove                                  */
/* -------------------------------------------------------------------------- */

export async function addToReview(
  type: ReviewType,
  targetId: string
) {
  const res = await fetch(
    "/review/api",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        targetId,
      }),
    }
  );

  if (!res.ok) {
    throw new Error(
      "Failed to add review."
    );
  }

  return (await res.json()) as ReviewItem;
}

export async function removeFromReview(
  reviewItemId: string
) {
  const res = await fetch(
    `/review/api/${reviewItemId}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    throw new Error(
      "Failed to remove review."
    );
  }
}

/* -------------------------------------------------------------------------- */
/*                                 Review                                     */
/* -------------------------------------------------------------------------- */
export async function getNextReviewCard(
  type: ReviewType
): Promise<ReviewCard<any> | null> {
  const res = await fetch(
    `/review/api/next?type=${type}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(
      "Failed to fetch next review card."
    );
  }

  return (await res.json()) as
    | ReviewCard<any>
    | null;
}
export async function getReviewItemByTarget(
  type: ReviewType,
  targetId: string
): Promise<ReviewItem | null> {
  const res = await fetch(
    `/review/api/item?type=${type}&targetId=${targetId}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(
      "Failed to fetch review item."
    );
  }

  return res.json();
}
export async function submitReview(
  reviewItemId: string,
  rating: ReviewRating,
  responseTimeMs?: number
) {
  const res = await fetch(
    `/review/api/${reviewItemId}/submit`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating,
        responseTimeMs,
      }),
    }
  );

  if (!res.ok) {
    throw new Error(
      "Failed to submit review."
    );
  }

  return (await res.json()) as ReviewProgress;
}

/* -------------------------------------------------------------------------- */
/*                                 History                                    */
/* -------------------------------------------------------------------------- */

export async function getHistory(
  reviewItemId: string
) {
  const res = await fetch(
    `/review/api/${reviewItemId}/history`
  );

  if (!res.ok) {
    throw new Error(
      "Failed to get review history."
    );
  }

  return (await res.json()) as ReviewHistory[];
}