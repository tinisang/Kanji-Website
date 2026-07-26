import { NextRequest, NextResponse } from "next/server";

import { getReviewCards, getTodayReviewCards } from "@/app/review/services/review.service";

export async function GET(
  req: NextRequest
) {
  const { searchParams } = req.nextUrl;

  const cards = await getReviewCards({
    mode: searchParams.get("mode") as any,
    type: searchParams.get("type") as any,
    folderId:
      searchParams.get("folderId") ??
      undefined,
    referenceSetId:
      searchParams.get("referenceSetId") ??
      undefined,
    limit: searchParams.get("limit")
      ? Number(searchParams.get("limit"))
      : undefined,
  });

  return NextResponse.json(cards);
}