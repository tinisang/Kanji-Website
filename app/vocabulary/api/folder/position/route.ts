import { NextRequest, NextResponse } from "next/server";
import * as vocabularyFolderService from "@/app/vocabulary/features/vocab_folders/services/vocabularyFolderService";



export async function PATCH(
  request: NextRequest
) {
  const body = await request.json();

  await vocabularyFolderService.updateVocabularyFolderPositions(

    body
  );

  return NextResponse.json({ success: true });
}