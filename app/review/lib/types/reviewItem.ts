import { ReviewType } from "./reviewType";

export interface ReviewItem {
  id: string;

  user_id: string;

  type: ReviewType;

  target_id: string;

  archived: boolean;

  created_at: string;
}