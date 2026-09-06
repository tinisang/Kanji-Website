import * as kanjiVocabularyService from "@/app/kanji/features/kanji-vocabulary/services/kanji-vocabulary.service";
import { NextResponse } from "next/server";

interface Props {
  params: Promise<{
    kanjiId: string;
  }>;
}

export async function GET(
  _: Request,
  { params }: Props
) {
  const { kanjiId } = await params;

  const relations =
    await kanjiVocabularyService.getKanjiVocabularyByKanji(
      kanjiId
    );

  return NextResponse.json(relations);
}