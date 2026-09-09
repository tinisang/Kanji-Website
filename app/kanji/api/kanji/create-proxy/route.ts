import { NextResponse } from "next/server";

import {
  createKanjiProxyService,
} from "@/app/kanji/features/kanji/services/kanji.service";

export async function POST(
  request: Request
) {
  try {
    const { kanjiId } =
      await request.json();

    if (!kanjiId) {
      return NextResponse.json(
        {
          success: false,
          error: "kanjiId is required",
        },
        { status: 400 }
      );
    }

    const proxy =
      await createKanjiProxyService(
        kanjiId
      );

    return NextResponse.json(
      {
        success: true,
        kanji: proxy,
      }
    );
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