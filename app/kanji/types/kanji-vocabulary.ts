export interface KanjiVocabulary {
  kanji_id: string;
  vocabulary_id: string;
  position: number;
}

export interface CreateKanjiVocabulary {
  kanji_id: string;
  vocabulary_id: string;
  position?: number;
}