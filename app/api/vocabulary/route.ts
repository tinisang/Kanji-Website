
import * as vocabularyService from "@/app/features/vocabulary/services/vocabulary.service";
import { getCurrentUserId } from "@/lib/auth/auth-user";
import { NextResponse } from "next/server";

export async function GET() {

  const vocabularies =
    await vocabularyService.getAllVocabulary();

  return NextResponse.json(vocabularies);
}

export async function POST(request: Request) {

  const body = await request.json();

  const vocabulary =
    await vocabularyService.createVocabulary(
      body
    );

  return NextResponse.json(vocabulary);
}