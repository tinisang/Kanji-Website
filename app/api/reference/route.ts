import { getAllReferenceSets } from "@/app/features/reference/services/reference.service";
import { auth } from "@/auth";
import { NextResponse } from "next/server";



export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const referenceSets =
      await getAllReferenceSets(
       
      );

    return NextResponse.json(
      referenceSets
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          "Failed to fetch reference sets",
      },
      { status: 500 }
    );
  }
}