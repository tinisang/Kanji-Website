// app/api/group/create/route.ts

import { createNewGroup } from "@/app/kanji/features/group/services/group.service";
import { NextResponse } from "next/server";

export async function POST() {
  const group =
    await createNewGroup();

  return NextResponse.json(
    group
  );
}