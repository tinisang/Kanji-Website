// app/api/kanji/create/route.ts

import { NextResponse } from "next/server";
import { createKanjiAndAssignGroup } from "@/lib/kanji";

export async function POST(
  request: Request
) {
  const {
    kanji,
    groupId,
  } = await request.json();

  const result =
    await createKanjiAndAssignGroup(
      kanji,
      groupId
    );

  return NextResponse.json(result);
}