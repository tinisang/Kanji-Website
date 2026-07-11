import * as vocabularyRepository from "@/app/vocabulary/lib/repositories/vocabularyRepository";
import { Vocabulary } from "@/app/vocabulary/lib/types/vocabulary";
import { getCurrentUserId } from "@/lib/auth/auth-user";

export async function getAllVocabulary(
  
) {
  const userId = await getCurrentUserId();
  return await vocabularyRepository.getAllVocabularyByUserId(
    userId
  );
}

export async function getVocabularyById(

  vocabularyId: string
) {
  const userId = await getCurrentUserId();
  return await vocabularyRepository.getVocabularyById(
    userId,
    vocabularyId
  );
}

export async function createVocabulary(

  vocabulary: Omit<
    Vocabulary,
    "id" | "user_id" | "created_at" | "updated_at"
  >
) {
  const userId = await getCurrentUserId();
  return await vocabularyRepository.createVocabulary(
    userId,
    vocabulary
  );
}

export async function updateVocabularyById(

  vocabulary: Vocabulary
) {
  const userId = await getCurrentUserId();
  return await vocabularyRepository.updateVocabularyById(
    userId,
    vocabulary
  );
}

export async function deleteVocabularyById(

  vocabularyId: string
) {
  const userId = await getCurrentUserId();
  return await vocabularyRepository.deleteVocabularyById(
    userId,
    vocabularyId
  );
}