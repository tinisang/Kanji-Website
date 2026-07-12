import { NextRequest, NextResponse } from "next/server";
import * as vocabularyFolderItemService from "@/app/vocabulary/features/vocab_folders/services/vocabularyFolderItemService";

interface Props {
  params: Promise<{
    folderId: string;
    vocabularyId: string;
  }>;
}

export async function DELETE(
  _: NextRequest,
  { params }: Props
) {
  const { folderId, vocabularyId } =
    await params;

  await vocabularyFolderItemService.deleteVocabularyFolderItem(
    vocabularyId,
    folderId
  );

  return NextResponse.json({ success: true });
}