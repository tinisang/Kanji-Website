
import { NextResponse } from "next/server";
import { deleteGrammarService, getGrammarByIdService, updateGrammarService } from "../../features/grammar_decks/services/grammarService";

export async function GET(
  _: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;

  const grammar =
    await getGrammarByIdService(id);

  return NextResponse.json(grammar);
}

export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const body = await request.json();

  const grammar =
    await updateGrammarService({
      ...body,
      id: (await params).id,
    });

  return NextResponse.json(grammar);
}

export async function DELETE(
  _: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;

  await deleteGrammarService(id);

  return NextResponse.json({
    success: true,
  });
}