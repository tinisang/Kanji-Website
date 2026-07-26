import { NextResponse } from "next/server";

import { removeFromReview } from "@/app/review/services/review.service";

interface Props {
  params: Promise<{
    reviewItemId: string;
  }>;
}

export async function DELETE(
  request: Request,
  { params }: Props
) {
  const { reviewItemId } =
    await params;

  await removeFromReview(
    reviewItemId
  );

  return NextResponse.json({
    success: true,
  });
}