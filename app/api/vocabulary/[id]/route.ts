
import * as vocabularyService from "@/app/features/vocabulary/services/vocabulary.service";
import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth/auth-user";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  _: Request,
  { params }: Props
) {
  const { id } = await params;
 

  const vocabulary =
    await vocabularyService.getVocabulary(
  
      id
    );

  return NextResponse.json(vocabulary);
}

export async function PUT(
  request: Request,
  { params }: Props
) {
  const { id } = await params;
 

  const body = await request.json();

  const vocabulary =
    await vocabularyService.updateVocabulary(
   
      {
        ...body,
        id,
      }
    );

  return NextResponse.json(vocabulary);
}

export async function DELETE(
  _: Request,
  { params }: Props
) {
  const { id } = await params;


  await vocabularyService.deleteVocabulary(
  
    id
  );

  return NextResponse.json({
    success: true,
  });
}