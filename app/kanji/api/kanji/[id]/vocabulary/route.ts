
import { NextResponse } from "next/server";
import * as kanjiService from "@/app/kanji/features/kanji/services/kanji.service";
import { getCurrentUserId } from "@/lib/auth/auth-user";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  _: Request,
  { params }: Props
) {
  const { id } = await params;
  const userId = await getCurrentUserId();

  const vocabularies =
    await kanjiService.getKanjiVocabularies(
      userId,
      id
    );

  return NextResponse.json(vocabularies);
}