// app/api/group/create/route.ts

import { NextResponse } from "next/server";
import { createGroup } from "@/lib/group";

export async function POST() {
  const group =
    await createGroup();

  return NextResponse.json(
    group
  );
}