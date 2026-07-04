import { updateReferenceSet } from "@/app/kanji/features/reference/services/reference.service";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const referenceSet = await req.json();

    const updatedReferenceSet =
      await updateReferenceSet(
        
        referenceSet
      );

    return NextResponse.json(
      updatedReferenceSet
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          "Failed to update reference set",
      },
      { status: 500 }
    );
  }
}