export interface KanjiGroup {
  id: string;
  name: string;
  description: string | null;
  position: number;
}


export interface KanjiGroupItem {
  group_id: string;
  kanji_id: string;
  position: number;
}

export type GroupUpdate = {
  groupId: string;
  position: number;
};
