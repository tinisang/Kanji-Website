import * as kanjiVocabularyRepository from "@/lib/repositories/kanji-vocabulary.repository";
import { KanjiVocabulary } from "@/types/kanji-vocabulary";

export async function getKanjiVocabularyByKanji(
  kanjiId: string
) {
  return kanjiVocabularyRepository.getKanjiVocabularyByKanjiId(
    kanjiId
  );
}

export async function getKanjiVocabularyByVocabulary(
  vocabularyId: string
) {
  return kanjiVocabularyRepository.getKanjiVocabularyByVocabularyId(
    vocabularyId
  );
}

export async function createKanjiVocabulary(
  relation: KanjiVocabulary
) {
  return kanjiVocabularyRepository.createKanjiVocabulary(
    relation
  );
}

export async function deleteKanjiVocabulary(
  kanjiId: string,
  vocabularyId: string
) {
  return kanjiVocabularyRepository.deleteKanjiVocabulary(
    kanjiId,
    vocabularyId
  );
}
export async function getAllKanjiVocabulary() {
  
  return kanjiVocabularyRepository.getAllKanjiVocabulary();
}

export async function updateKanjiVocabularyPositions(
  relations: KanjiVocabulary[]
) {
  return kanjiVocabularyRepository.updateKanjiVocabularyPositions(
    relations
  );
}