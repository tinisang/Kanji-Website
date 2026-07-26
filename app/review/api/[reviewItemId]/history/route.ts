import { NextResponse } from "next/server";

import { getHistory } from "@/app/review/services/review.service";

interface Props {
  params: Promise<{
    reviewItemId: string;
  }>;
}

export async function GET(
  request: Request,
  { params }: Props
) {
  const { reviewItemId } =
    await params;

  const history =
    await getHistory(reviewItemId);

  return NextResponse.json(
    history
  );
}