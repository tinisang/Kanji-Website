import { NextRequest, NextResponse } from "next/server";
import * as vocabularyFolderService from "@/app/vocabulary/features/vocab_folders/services/vocabularyFolderService";



export async function GET() {
  const folders =
    await vocabularyFolderService.getAllVocabularyFolder();

  return NextResponse.json(folders);
}

export async function POST(
  request: NextRequest
) {
  const body = await request.json();

  const folder =
    await vocabularyFolderService.createVocabularyFolder(

      body
    );

  return NextResponse.json(folder);
}