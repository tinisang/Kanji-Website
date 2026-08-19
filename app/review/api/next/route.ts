import { NextRequest, NextResponse } from "next/server";

import { getNextReviewCard } from "@/app/review/services/review.service";

export async function GET(req: NextRequest) {
  try {
    const type = req.nextUrl.searchParams.get("type");

    if (!type) {
      return NextResponse.json(
        { error: "Missing review type" },
        { status: 400 }
      );
    }

    const card = await getNextReviewCard(type as any);

    return NextResponse.json(card);
  } catch (error) {
    console.error(
      "❌ GET /review/api/next ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    );
  }
}