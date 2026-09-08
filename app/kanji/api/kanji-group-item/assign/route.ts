import { addKanjiToGroup } from "@/app/kanji/features/collection/services/kanji-group.service";
import { NextResponse } from "next/server";

export async function POST(
  request: Request
) {
  try {
    const {
      kanjiId,
      groupId,
    } = await request.json();

    if (!kanjiId || !groupId) {
      return NextResponse.json(
        {
          success: false,
          error:
            "kanjiId and groupId are required",
        },
        {
          status: 400,
        }
      );
    }

    const item =
      await addKanjiToGroup(
        kanjiId,
        groupId
      );

    return NextResponse.json({
      success: true,
      item,
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
      {
        status: 500,
      }
    );
  }
}