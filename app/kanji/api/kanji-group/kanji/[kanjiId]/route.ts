import { getGroupsByKanjiId } from "@/app/kanji/features/group/services/group.service";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ kanjiId: string }> }
) {
  try {
    const { kanjiId } = await params;

    const groups = await getGroupsByKanjiId(kanjiId);

    return NextResponse.json(groups);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch groups" },
      { status: 500 }
    );
  }
}