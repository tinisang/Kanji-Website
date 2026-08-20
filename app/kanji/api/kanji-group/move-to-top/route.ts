import { moveGroupToTopAction } from "@/app/kanji/features/group/services/group.service";
import { NextResponse } from "next/server";

export async function POST(
  request: Request
) {
  try {
    const { groupId } =
      await request.json();

    if (!groupId) {
      return NextResponse.json(
        {
          error: "groupId is required",
        },
        { status: 400 }
      );
    }

    const group =
      await moveGroupToTopAction(
        groupId
      );

    return NextResponse.json(group);
  } catch (error) {
    console.error(
      "Move group to top error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to move group to top",
      },
      { status: 500 }
    );
  }
}