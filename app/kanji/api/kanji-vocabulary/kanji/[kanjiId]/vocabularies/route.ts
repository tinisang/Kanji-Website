import { NextResponse } from "next/server";

import {
  getVocabulariesByKanjiId,
} from "@/app/kanji/features/kanji-vocabulary/services/kanji-vocabulary.service";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ kanjiId: string }>;
  }
) {
  try {
    const { kanjiId } = await params;

    const vocabularies =
      await getVocabulariesByKanjiId(kanjiId);

    return NextResponse.json(vocabularies);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch vocabularies" },
      { status: 500 }
    );
  }
}