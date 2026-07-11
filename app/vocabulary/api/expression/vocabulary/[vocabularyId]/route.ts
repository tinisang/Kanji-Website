import { NextRequest, NextResponse } from "next/server";
import * as vocabularyExpressionService from "@/app/vocabulary/features/vocabulary_deck/services/vocabularyExpressionService";

interface Props {
  params: Promise<{
    vocabularyId: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: Props
) {
  const { vocabularyId } = await params;

  return NextResponse.json(
    await vocabularyExpressionService.getAllVocabularyExpressionByVocabularyId(
      vocabularyId
    )
  );
}

export async function POST(
  request: NextRequest,
  { params }: Props
) {
  const { vocabularyId } = await params;

  const body = await request.json();

  return NextResponse.json(
    await vocabularyExpressionService.createVocabularyExpression({
      ...body,
      vocabulary_id: vocabularyId,
    })
  );
}