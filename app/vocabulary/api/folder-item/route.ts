import { NextRequest, NextResponse } from "next/server";
import * as vocabularyFolderItemService from "@/app/vocabulary/features/vocab_folders/services/vocabularyFolderItemService";

export async function GET() {
  const items =
    await vocabularyFolderItemService.getAllVocabularyFolderItem();

  return NextResponse.json(items);
}

export async function POST(
  request: NextRequest
) {
  const body = await request.json();

  const item =
    await vocabularyFolderItemService.createVocabularyFolderItem(
      body
    );

  return NextResponse.json(item);
}