import { deleteGroup } from "@/app/kanji/features/group/services/group.service";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request
) {
  const { groupId } =
    await request.json();

  await deleteGroup(groupId);

  return Response.json({
    success: true,
  });
}