import { NextRequest, NextResponse } from "next/server";
import * as vocabularyFolderItemService from "@/app/vocabulary/features/vocab_folders/services/vocabularyFolderItemService";

export async function PATCH(
  request: NextRequest
) {
  const body = await request.json();

  await vocabularyFolderItemService.updateVocabularyFolderItemPosition(
    body
  );

  return NextResponse.json({ success: true });
}