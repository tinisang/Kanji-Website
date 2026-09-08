

import { NextResponse } from "next/server";

import {
  removeKanjiFromSpecificGroup,
} from "@/app/kanji/features/collection/services/kanji-group.service";

export async function DELETE(request: Request) {
  try {
    const { kanjiId, groupId } =
      await request.json();

    if (!kanjiId || !groupId) {
      return NextResponse.json(
        {
          success: false,
          error: "kanjiId and groupId are required",
        },
        { status: 400 }
      );
    }

    await removeKanjiFromSpecificGroup(
      kanjiId,
      groupId
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}