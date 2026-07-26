import { ReviewItem } from "./reviewItem";
import { ReviewProgress } from "./reviewProgress";

export interface ReviewCard<T> {
  item: ReviewItem;

  progress: ReviewProgress;

  content: T;
}