import { getUsagesByVocabularyId } from "@/app/vocabulary/features/vocabulary_deck/services/vocabularyExpressionService";
import { NextResponse } from "next/server";


export async function GET(
  _: Request,
  {
    params,
  }: {
    params: Promise<{ vocabularyId: string }>;
  }
) {
  const { vocabularyId } = await params;

  const usages =
    await getUsagesByVocabularyId(vocabularyId);

  return NextResponse.json(usages);
}