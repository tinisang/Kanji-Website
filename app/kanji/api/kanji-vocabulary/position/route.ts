import { NextRequest, NextResponse } from "next/server";
import { KanjiVocabulary } from "@/app/kanji/types/kanji-vocabulary";
import * as kanjiVocabularyService from "@/app/kanji/features/kanji-vocabulary/services/kanji-vocabulary.service";

export async function PATCH(
  request: NextRequest
) {
  const relations =
    (await request.json()) as KanjiVocabulary[];

  await kanjiVocabularyService.updateKanjiVocabularyPositions(
    relations
  );

  return NextResponse.json({
    success: true,
  });
}