import { NextRequest, NextResponse } from "next/server";

import {
  addKanjiReferenceItem,
  editKanjiReferenceItem,
  getAllKanjiReferenceItems,
  removeKanjiReference,
} from "@/app/kanji/features/reference/services/reference-item.service";

export async function GET() {
  return NextResponse.json(
    await getAllKanjiReferenceItems()
  );
}

export async function POST(
  request: NextRequest
) {
  return NextResponse.json(
    await addKanjiReferenceItem(
      await request.json()
    )
  );
}

export async function DELETE(
  request: NextRequest
) {
  const {
    kanjiId,
    referenceSetId,
  } = await request.json();

  await removeKanjiReference(
    kanjiId,
    referenceSetId
  );

  return NextResponse.json({
    success: true,
  });
}

export async function PUT(
  request: NextRequest
) {
  return NextResponse.json(
    await editKanjiReferenceItem(
      await request.json()
    )
  );
}