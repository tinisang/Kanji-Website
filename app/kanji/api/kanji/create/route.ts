// app/api/kanji/create/route.ts

import { createKanjiAndAssignGroup } from "@/app/kanji/features/kanji/services/kanji.service";
import { NextResponse } from "next/server";


export async function POST(
  request: Request
) {
  try {
    const {
      kanji,
      groupId,
    } = await request.json();

    const result =
      await createKanjiAndAssignGroup(
        kanji,
        groupId
      );

    return NextResponse.json(
      result
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}