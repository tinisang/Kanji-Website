import { ReviewRating } from "../../lib/types/reviewType";
import { getReviewPreviews } from "../../services/reviewScheduler";
import { Button } from "@/components/ui/button";

interface Props {
  previews: ReturnType<typeof getReviewPreviews>;
  ratingLoading: boolean;
  onRate: (rating: ReviewRating) => void;
}

function formatReviewTime(date: Date) {
  const diff = date.getTime() - Date.now();

  const minutes = Math.max(
    0,
    Math.round(diff / 60000)
  );

  if (minutes < 60) return `${minutes}m`;

  const hours = Math.round(minutes / 60);

  if (hours < 24) return `${hours}h`;

  const days = Math.round(hours / 24);

  if (days < 30) return `${days}d`;

  const months = Math.round(days / 30);

  if (months < 12) return `${months}mo`;

  return `${Math.round(months / 12)}y`;
}

export default function ReviewRatingButtons({
  previews,
  ratingLoading,
  onRate,
}: Props) {
  const buttons = [
    {
      rating: 1 as ReviewRating,
      label: "Again",
      due: previews.again.card.due,
      variant: "destructive" as const,
    },
    {
      rating: 2 as ReviewRating,
      label: "Hard",
      due: previews.hard.card.due,
      variant: "secondary" as const,
    },
    {
      rating: 3 as ReviewRating,
      label: "Good",
      due: previews.good.card.due,
      className:
        "bg-emerald-600 hover:bg-emerald-700",
    },
    {
      rating: 4 as ReviewRating,
      label: "Easy",
      due: previews.easy.card.due,
      className:
        "bg-foreground text-background hover:bg-foreground/90",
    },
  ];

  return (
    <div
      className="
        grid
        grid-cols-2
        gap-2
        border-t
        bg-muted/10
        p-3
        sm:grid-cols-4
        sm:gap-3
        sm:p-4
      "
    >
      {buttons.map((button) => (
        <Button
          key={button.rating}
          variant={button.variant}
          className={`
            h-auto
            min-h-12
            w-full
            py-2
            sm:min-h-14
            ${button.className ?? ""}
          `}
          disabled={ratingLoading}
          onClick={() => onRate(button.rating)}
        >
          <div className="flex flex-col items-center leading-tight">
            <span className="text-sm font-semibold sm:text-base">
              {button.label}
            </span>

            <span className="mt-0.5 text-[11px] font-normal opacity-70 sm:text-xs">
              {formatReviewTime(button.due)}
            </span>
          </div>
        </Button>
      ))}
    </div>
  );
}