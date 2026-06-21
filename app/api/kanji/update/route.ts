// app/api/kanji/update/route.ts

import { NextResponse } from "next/server";
import { updateKanji } from "@/lib/kanji";

export async function POST(request: Request) {
  try {
    const kanji = await request.json();

    const result = await updateKanji(kanji);

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Update failed",
      },
      {
        status: 500,
      }
    );
  }
}