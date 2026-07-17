export interface WishlistItem {
  id: string;

  user_id: string;

  item_name: string;

  target_price: number;

  current_price: number | null;

  priority:
    | "low"
    | "medium"
    | "high";

  target_date: string | null;

  notes: string | null;

  purchased: boolean;

  created_at: string;

  updated_at: string;
}