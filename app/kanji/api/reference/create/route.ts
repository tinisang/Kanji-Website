import { createReferenceSet } from "@/app/kanji/features/reference/services/reference.service";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const referenceSet = await req.json();

    const createdReferenceSet =
      await createReferenceSet(
        referenceSet
      );

    return NextResponse.json(createdReferenceSet);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          "Failed to create reference set",
      },
      { status: 500 }
    );
  }
}