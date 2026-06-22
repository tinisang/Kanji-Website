// app/api/kanji/update/route.ts

import { updateKanji } from "@/app/features/kanji/services/kanji.service";
import { NextResponse } from "next/server";


export async function POST(
  request: Request
) {
  try {
    const kanji =
      await request.json();

    const result =
      await updateKanji(
        kanji
      );

    return NextResponse.json(
      result
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Update failed",
      },
      {
        status: 500,
      }
    );
  }
}