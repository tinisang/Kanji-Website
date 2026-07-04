import * as vocabularyRepository from "@/lib/repositories/vocabulary.repository";
import { Vocabulary } from "@/types/vocabulary";

import  {getCurrentUserId}  from "@/lib/auth/auth-user";

export async function getAllVocabulary(
) {
  const userId = await getCurrentUserId();
  return vocabularyRepository.getAllVocabularyByUserId(userId);
}

export async function getVocabulary(
  vocabularyId: string
) {
  const userId = await getCurrentUserId();
  return vocabularyRepository.getVocabularyById(
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

  return vocabularyRepository.createVocabulary(
    userId,
    vocabulary
  );
}

export async function updateVocabulary(
  
  vocabulary: Vocabulary
) {
  const userId = await getCurrentUserId();
  return vocabularyRepository.updateVocabularyById(
    userId,
    vocabulary
  );
}

export async function deleteVocabulary(
 
  vocabularyId: string
) {
  const userId = await getCurrentUserId();
  return vocabularyRepository.deleteVocabularyById(
    userId,
    vocabularyId
  );
}