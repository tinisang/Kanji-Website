import { NextRequest, NextResponse } from "next/server";
import * as vocabularyExpressionService from "@/app/vocabulary/features/vocabulary_deck/services/vocabularyExpressionService";

interface Props {
  params: Promise<{
    expressionId: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: Props
) {
  const { expressionId } = await params;

  return NextResponse.json(
    await vocabularyExpressionService.getVocabularyExpressionById(
      expressionId
    )
  );
}

export async function PATCH(
  request: NextRequest
) {
  const body = await request.json();

  return NextResponse.json(
    await vocabularyExpressionService.updateVocabularyExpressionById(
      body
    )
  );
}

export async function DELETE(
  request: NextRequest,
  { params }: Props
) {
  const { expressionId } = await params;

  await vocabularyExpressionService.deleteVocabularyExpressionById(
    expressionId
  );

  return NextResponse.json({ success: true });
}