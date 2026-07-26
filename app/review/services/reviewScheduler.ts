import {
  Card,
  State,
  Rating,
  createEmptyCard,
  fsrs,
  Grade,
} from "ts-fsrs";

import { ReviewProgress } from "../lib/types/reviewProgress";
import { ReviewRating } from "../lib/types/reviewType";

const scheduler = fsrs({});

function toFsrsState(
  state: ReviewProgress["state"]
): State {
  switch (state) {
    case "new":
      return State.New;

    case "learning":
      return State.Learning;

    case "review":
      return State.Review;

    case "relearning":
      return State.Relearning;

    default:
      return State.New;
  }
}

function fromFsrsState(
  state: State
): ReviewProgress["state"] {
  switch (state) {
    case State.New:
      return "new";

    case State.Learning:
      return "learning";

    case State.Review:
      return "review";

    case State.Relearning:
      return "relearning";

    default:
      return "new";
  }
}

function toCard(
  progress: ReviewProgress
): Card {
  const card = createEmptyCard(new Date());

  card.state = toFsrsState(progress.state);
  card.due = new Date(progress.due_at);
  card.last_review = progress.last_reviewed_at
    ? new Date(progress.last_reviewed_at)
    : undefined;

  card.stability = progress.stability;
  card.difficulty = progress.difficulty;
  card.reps = progress.repetitions;
  card.lapses = progress.lapses;

  return card;
}

export function scheduleReview(
  progress: ReviewProgress,
  rating: ReviewRating
): ReviewProgress {
  const now = new Date();

  const card = toCard(progress);

  const scheduling = scheduler.next(
    card,
    now,
    rating as Grade
  );

  const next = scheduling.card;

  return {
    ...progress,
    state: fromFsrsState(next.state),
    due_at: next.due.toISOString(),
    last_reviewed_at: next.last_review
      ? next.last_review.toISOString()
      : null,
    repetitions: next.reps,
    lapses: next.lapses,
    stability: next.stability,
    difficulty: next.difficulty,
    updated_at: now.toISOString(),
  };
}