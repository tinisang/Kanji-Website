import { updateKanjiGroupItems } from "@/lib/db/KanjiGroupItem";


export async function POST(req: Request) {
  const items = await req.json();

  await updateKanjiGroupItems(items);

  return Response.json({ success: true });
}