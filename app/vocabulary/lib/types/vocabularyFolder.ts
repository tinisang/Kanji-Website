export interface FolderItem {
  id: string;
  user_id: string;
  name: string;
  color: string;
  position: number;
  parent_id: string | null;
  created_at: string;
  updated_at: string;
}