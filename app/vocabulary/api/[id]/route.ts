import { NextRequest, NextResponse } from "next/server";

import * as vocabularyService from "@/app/vocabulary/features/vocabulary_deck/services/vocabularyService";
import { getCurrentUserId } from "@/lib/auth/auth-user";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: Props
) {

  const { id } = await params;

  return NextResponse.json(
    await vocabularyService.getVocabularyById(
  
      id
    )
  );
}

export async function PATCH(
  request: NextRequest
) {
  

  const body = await request.json();

  return NextResponse.json(
    await vocabularyService.updateVocabularyById(
     
      body
    )
  );
}

export async function DELETE(
  request: NextRequest,
  { params }: Props
) {
  
  const { id } = await params;

  await vocabularyService.deleteVocabularyById(

    id
  );

  return NextResponse.json({ success: true });
}