import { ReviewState } from "./reviewType";

export interface ReviewProgress {
  review_item_id: string;

  state: ReviewState;

  due_at: string;

  last_reviewed_at: string | null;

  repetitions: number;

  lapses: number;

  stability: number;

  difficulty: number;

  created_at: string;

  updated_at: string;
}