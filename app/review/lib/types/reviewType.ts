import { Grade } from "ts-fsrs";

export type ReviewType =
  | "kanji"
  | "vocabulary"
  | "grammar";

export type ReviewState =
  | "new"
  | "learning"
  | "review"
  | "relearning";

export type ReviewRating = Grade;