import * as kanjiVocabularyService from "@/app/kanji/features/kanji-vocabulary/services/kanji-vocabulary.service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const relation =
    await kanjiVocabularyService.createKanjiVocabulary(
      body
    );

  return NextResponse.json(relation);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);

  const kanjiId = searchParams.get("kanjiId")!;
  const vocabularyId =
    searchParams.get("vocabularyId")!;

  await kanjiVocabularyService.deleteKanjiVocabulary(
    kanjiId,
    vocabularyId
  );

  return NextResponse.json({
    success: true,
  });
}