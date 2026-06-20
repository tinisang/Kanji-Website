import { updateKanjiGroups } from "@/lib/db/KanjiGroup";

export async function POST(req: Request) {
  try {
    const updates = await req.json();

    await updateKanjiGroups(updates);

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);

    return Response.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}