import { NextResponse } from "next/server";
import { getAllKanji } from "../../features/kanji/services/kanji.service";



export async function GET() {
  try {
    const kanjis = await getAllKanji();

    return NextResponse.json(kanjis);
  } catch (error) {
    console.error(
      "Failed to fetch kanjis:",
      error
    );

    return NextResponse.json(
      { error: "Failed to fetch kanjis" },
      { status: 500 }
    );
  }
}