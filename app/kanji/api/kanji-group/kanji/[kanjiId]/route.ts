import { getGroupByKanjiId } from "@/app/kanji/features/group/services/group.service";
import { NextResponse } from "next/server";



export async function GET(
  request: Request,
  { params }: { params: Promise<{ kanjiId: string }> }
) {
  try {
    const { kanjiId } = await params;

    const group = await getGroupByKanjiId(
      kanjiId
    );

    if (!group) {
      return NextResponse.json(
        null,
        { status: 404 }
      );
    }

    return NextResponse.json(group);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch group" },
      { status: 500 }
    );
  }
}