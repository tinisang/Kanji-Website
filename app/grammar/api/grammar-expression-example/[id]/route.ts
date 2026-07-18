import { deleteGrammarExpressionExampleService, getGrammarExpressionExampleByIdService, updateGrammarExpressionExampleService } from "@/app/grammar/features/grammar_decks/services/grammarExpressionExampleService";
import { NextRequest, NextResponse } from "next/server";



export async function GET(
  _: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;

  const data =
    await getGrammarExpressionExampleByIdService(
      id
    );

  return NextResponse.json(data);
}

export async function PUT(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;

  const body = await request.json();

  const data =
    await updateGrammarExpressionExampleService({
      ...body,
      id,
    });

  return NextResponse.json(data);
}

export async function DELETE(
  _: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;

  await deleteGrammarExpressionExampleService(
    id
  );

  return NextResponse.json({
    success: true,
  });
}