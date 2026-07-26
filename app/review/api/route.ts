import { NextRequest, NextResponse } from "next/server";
import { addToReview } from "../services/review.service";


export async function POST(
  request: NextRequest
) {
  const { type, targetId } =
    await request.json();

  const review = await addToReview(
    type,
    targetId
  );

  return NextResponse.json(review);
}