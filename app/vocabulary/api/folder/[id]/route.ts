import { NextRequest, NextResponse } from "next/server";
import * as vocabularyFolderService from "@/app/vocabulary/features/vocab_folders/services/vocabularyFolderService";

const USER_ID = process.env.DEFAULT_USER_ID!;

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(
  request: NextRequest,
  { params }: Props
) {
  const { id } = await params;
  const body = await request.json();

  const folder =
    await vocabularyFolderService.updateVocabularyFolderById(

      {
        ...body,
        id,
      }
    );

  return NextResponse.json(folder);
}

export async function DELETE(
  _: NextRequest,
  { params }: Props
) {
  const { id } = await params;

  await vocabularyFolderService.deleteVocabularyFolderById(

    id
  );

  return NextResponse.json({ success: true });
}