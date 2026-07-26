import { NextRequest, NextResponse } from "next/server";

import { submitReview } from "@/app/review/services/review.service";

interface Props {
  params: Promise<{
    reviewItemId: string;
  }>;
}

export async function POST(
  request: NextRequest,
  { params }: Props
) {
  const { reviewItemId } =
    await params;

  const {
    rating,
    responseTimeMs,
  } = await request.json();

  const progress =
    await submitReview(
      reviewItemId,
      rating,
      responseTimeMs
    );

  return NextResponse.json(
    progress
  );
}