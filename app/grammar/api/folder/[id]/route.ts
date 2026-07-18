import { NextRequest, NextResponse } from "next/server";



import { FolderItem } from "@/app/vocabulary/lib/types/vocabularyFolder";
import { deleteGrammarFolderService, updateGrammarFolderService } from "@/app/grammar/features/grammar_decks/services/grammarFolderService";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(
  request: NextRequest,
  { params }: Params
) {
  const { id } = await params;

  const folder = (await request.json()) as FolderItem;

  const updated =
    await updateGrammarFolderService({
      ...folder,
      id,
    });

  return NextResponse.json(updated);
}

export async function DELETE(
  _: NextRequest,
  { params }: Params
) {
  const { id } = await params;

  await deleteGrammarFolderService(id);

  return NextResponse.json({
    success: true,
  });
}