
import { deleteGrammarExpressionService, getGrammarExpressionByIdService, updateGrammarExpressionService } from "@/app/grammar/features/grammar_decks/services/grammarExpressionService";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;

  const expression =
    await getGrammarExpressionByIdService(
      id
    );

  return NextResponse.json(
    expression
  );
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

  const expression =
    await updateGrammarExpressionService({
      ...body,
      id: (await params).id,
    });

  return NextResponse.json(
    expression
  );
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

  await deleteGrammarExpressionService(
    id
  );

  return NextResponse.json({
    success: true,
  });
}