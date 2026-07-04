// app/api/kanji-group-item/update/route.ts

import { reorderGroupItems } from "@/app/kanji/features/collection/services/kanji-group.service";
import { NextResponse } from "next/server";


export async function POST(
  request: Request
) {
  try {
    const updates =
      await request.json();
console.log(
    "ITEM UPDATES",
    updates
  );
    await reorderGroupItems(
      updates
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}