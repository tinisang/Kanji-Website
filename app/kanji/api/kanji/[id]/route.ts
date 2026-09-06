import { getKanjiById } from "@/app/kanji/features/kanji/services/kanji.service";
import { NextResponse } from "next/server";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  _request: Request,
  { params }: Props
) {
  try {
    const { id } = await params;

    const kanji = await getKanjiById(id);

    if (!kanji) {
      return NextResponse.json(
        { error: "Kanji not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(kanji);
  } catch (error) {
    console.error(
      "Failed to fetch kanji:",
      error
    );

    return NextResponse.json(
      { error: "Failed to fetch kanji" },
      { status: 500 }
    );
  }
}