export interface GrammarFolderItem {
  grammar_id: string;
  folder_id: string;
  position: number;
  created_at: string;
}

export type UpdateGrammarFolderItem = Pick<
  GrammarFolderItem,
  "grammar_id" | "folder_id" | "position"
>;