
import { NextResponse } from "next/server";
import { createGrammarExpressionService } from "../../features/grammar_decks/services/grammarExpressionService";

export async function POST(
  request: Request
) {
  const body = await request.json();

  const expression =
    await createGrammarExpressionService(
      body
    );

  return NextResponse.json(
    expression
  );
}