import { getKanjisByGroupId } from "@/app/kanji/features/group/services/group.service";
import { NextResponse } from "next/server";


export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ groupId: string }>;
  }
) {
  try {
    const { groupId } = await params;

    const kanjis =
      await getKanjisByGroupId(groupId);

    return NextResponse.json(kanjis);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch kanjis" },
      { status: 500 }
    );
  }
}