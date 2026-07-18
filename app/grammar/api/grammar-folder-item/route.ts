import { NextRequest, NextResponse } from "next/server";



import { GrammarFolderItem, UpdateGrammarFolderItem } from "@/app/grammar/lib/types/GrammarFolderItem";
import { createGrammarFolderItem, getAllGrammarFolderItem, updateGrammarFolderItems } from "../../features/grammar_decks/services/grammarFolderItemService";

export async function GET() {
  const items =
    await getAllGrammarFolderItem();

  return NextResponse.json(items);
}

export async function PUT(
  request: NextRequest
) {
  const items =
    (await request.json()) as UpdateGrammarFolderItem[];

  await updateGrammarFolderItems(items);

  return NextResponse.json({
    success: true,
  });
}

export async function POST(
  request: NextRequest
) {
  const item = (await request.json()) as Pick<
    GrammarFolderItem,
    "grammar_id" | "folder_id"
  >;

  const created =
    await createGrammarFolderItem(
      item
    );

  return NextResponse.json(created);
}