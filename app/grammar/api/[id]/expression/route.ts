
import { getGrammarExpressionsByGrammarIdService } from "@/app/grammar/features/grammar_decks/services/grammarExpressionService";
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

  const expressions =
    await getGrammarExpressionsByGrammarIdService(
      id
    );

  return NextResponse.json(
    expressions
  );
}