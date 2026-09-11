// app/kanji/api/kanji-vocabulary/remove/route.ts

import { NextRequest, NextResponse } from "next/server";

import * as kanjiVocabularyService from "@/app/kanji/features/kanji-vocabulary/services/kanji-vocabulary.service";

export async function DELETE(
  request: NextRequest
) {
  const { kanjiId, vocabularyId } =
    await request.json();

  if (!kanjiId || !vocabularyId) {
    return NextResponse.json(
      {
        error:
          "kanjiId and vocabularyId are required",
      },
      { status: 400 }
    );
  }

  await kanjiVocabularyService.deleteKanjiVocabulary(
    kanjiId,
    vocabularyId
  );

  return NextResponse.json({
    success: true,
  });
}