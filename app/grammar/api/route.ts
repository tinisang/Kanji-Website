
import { NextResponse } from "next/server";
import { createGrammarService, getAllGrammarService } from "../features/grammar_decks/services/grammarService";

export async function GET() {
  const grammar =
    await getAllGrammarService();

  return NextResponse.json(grammar);
}

export async function POST(
  request: Request
) {
  const body = await request.json();

  const grammar =
    await createGrammarService(body);

  return NextResponse.json(grammar);
}