import { NextRequest, NextResponse } from "next/server";

import { getReviewCards } from "@/app/review/services/review.service";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const mode = searchParams.get("mode");
    const type = searchParams.get("type");

    console.log("REVIEW API PARAMS:", {
      mode,
      type,
      folderId: searchParams.get("folderId"),
      referenceSetId: searchParams.get("referenceSetId"),
      limit: searchParams.get("limit"),
    });

    const cards = await getReviewCards({
      mode: mode as any,
      type: type as any,
      folderId: searchParams.get("folderId") ?? undefined,
      referenceSetId:
        searchParams.get("referenceSetId") ?? undefined,
      limit: searchParams.get("limit")
        ? Number(searchParams.get("limit"))
        : undefined,
    });

    return NextResponse.json(cards);
  } catch (error) {
    console.error("❌ GET /review/api/cards ERROR:", error);

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