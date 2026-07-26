import { NextRequest, NextResponse } from "next/server";

import { getReviewItemByTarget } from "@/app/review/services/review.service";
import { ReviewType } from "@/app/review/lib/types/reviewType";

export async function GET(
  request: NextRequest
) {
  const { searchParams } = new URL(request.url);

  const type = searchParams.get(
    "type"
  ) as ReviewType;

  const targetId =
    searchParams.get("targetId");

  if (!type || !targetId) {
    return NextResponse.json(
      {
        message:
          "Missing type or targetId.",
      },
      { status: 400 }
    );
  }

  const item = await getReviewItemByTarget(type, targetId);

if (!item) {
  return NextResponse.json(null);
}

return NextResponse.json(item);
}


import {
  deleteReviewItemByTarget,
} from "../../services/review.service";

export async function DELETE(
  req: NextRequest
) {
  const {
    type,
    targetId,
  } = await req.json();

  await deleteReviewItemByTarget(
    type,
    targetId
  );

  return NextResponse.json({
    success: true,
  });
}