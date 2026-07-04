// app/api/kanji-group/update/route.ts

import { reorderGroups } from "@/app/kanji/features/group/services/group.service";
import { NextResponse } from "next/server";


export async function POST(
  request: Request
) {
  try {
    const updates =
      await request.json();
 
    await reorderGroups(
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