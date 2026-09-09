import { NextResponse } from "next/server";
import { addVocabularyToKanji } from "@/app/kanji/features/vocabulary/services/vocabulary.service";

export async function POST(request: Request) {
  try {
    const { kanjiId, vocabularyId } = await request.json();

    if (!kanjiId || !vocabularyId) {
      return NextResponse.json(
        { success: false, error: "kanjiId and vocabularyId are required" },
        { status: 400 }
      );
    }

    const relation = await addVocabularyToKanji(
      kanjiId,
      vocabularyId
    );

    return NextResponse.json({
      success: true,
      relation,
    });
  } catch (error) {
    console.error("Failed to add vocabulary to kanji:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}