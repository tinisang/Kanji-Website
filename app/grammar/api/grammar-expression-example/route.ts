import { NextRequest, NextResponse } from "next/server";
import { createGrammarExpressionExampleService, getAllGrammarExpressionExampleService } from "../../features/grammar_decks/services/grammarExpressionExampleService";



export async function GET() {
  const data =
    await getAllGrammarExpressionExampleService();

  return NextResponse.json(data);
}

export async function POST(
  request: NextRequest
) {
  const body = await request.json();

  const data =
    await createGrammarExpressionExampleService(
      body
    );

  return NextResponse.json(data);
}