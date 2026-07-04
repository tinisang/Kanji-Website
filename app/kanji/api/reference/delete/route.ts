import { deleteReferenceSet } from "@/app/kanji/features/reference/services/reference.service";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";



export async function DELETE(
  req: NextRequest
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { referenceSetId } =
      await req.json();

    await deleteReferenceSet(

      referenceSetId
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          "Failed to delete reference set",
      },
      { status: 500 }
    );
  }
}