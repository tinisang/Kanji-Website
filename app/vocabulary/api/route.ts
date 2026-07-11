import { NextRequest, NextResponse } from "next/server";

import * as vocabularyService from "@/app/vocabulary/features/vocabulary_deck/services/vocabularyService";
import { getCurrentUserId } from "@/lib/auth/auth-user";

export async function GET() {


  const vocabularies =
    await vocabularyService.getAllVocabulary(
     
    );

  return NextResponse.json(vocabularies);
}

export async function POST(
  request: NextRequest
) {


  const body = await request.json();

  const vocabulary =
    await vocabularyService.createVocabulary(
      
      body
    );

  return NextResponse.json(vocabulary);
}