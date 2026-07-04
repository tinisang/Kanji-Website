// app/api/kanji/delete/route.ts

import { NextResponse } from "next/server";

import {
  deleteKanji,
} from "@/app/kanji/features/kanji/services/kanji.service";

export async function POST(
  request: Request
) {
  try {
    const {
      kanjiId,
    } = await request.json();

    await deleteKanji(
      kanjiId
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Delete failed",
      },
      {
        status: 500,
      }
    );
  }
}