import { NextRequest, NextResponse } from "next/server";



import { FolderItem } from "@/app/vocabulary/lib/types/vocabularyFolder";
import { createGrammarFolderService, getAllGrammarFolder } from "../../features/grammar_decks/services/grammarFolderService";

export async function GET() {
  const folders =
    await getAllGrammarFolder();

  return NextResponse.json(folders);
}

export async function POST(
  request: NextRequest
) {
  const folder = (await request.json()) as Omit<
    FolderItem,
    | "id"
    | "user_id"
    | "position"
    | "created_at"
    | "updated_at"
    | "type"
  >;

  const created =
    await createGrammarFolderService(
      folder
    );

  return NextResponse.json(created);
}