import { ReviewRating } from "./reviewType";

export interface ReviewHistory {
  id: string;

  review_item_id: string;

  rating: ReviewRating;

  reviewed_at: string;

  elapsed_days: number;

  scheduled_days: number;

  response_time_ms: number | null;
}