// app/review/api/progress/[reviewItemId]/route.ts

import { getReviewProgressByItemId } from "@/app/review/services/review.service";
import { NextRequest, NextResponse } from "next/server";



interface Props {
  params: Promise<{
    reviewItemId: string;
  }>;
}

export async function GET(
  _req: NextRequest,
  { params }: Props
) {
  const { reviewItemId } =
    await params;

  const progress =
    await getReviewProgressByItemId(
      reviewItemId
    );

  if (!progress) {
    return NextResponse.json(
      null,
      { status: 404 }
    );
  }

  return NextResponse.json(progress);
}