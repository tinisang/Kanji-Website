import * as kanjiVocabularyService from "@/app/features/kanji-vocabulary/services/kanji-vocabulary.service";
import { NextResponse } from "next/server";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  _: Request,
  { params }: Props
) {
  const { id } = await params;

  const relations =
    await kanjiVocabularyService.getKanjiVocabularyByVocabulary(
      id
    );

  return NextResponse.json(relations);
}