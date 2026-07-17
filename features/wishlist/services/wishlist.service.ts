import { createClient } from "@/lib/supabase/server";

import type { WishlistItem } from "../types/wishlist";

export class WishlistService {
  static async getItems(): Promise<
    WishlistItem[]
  > {
    const supabase =
      await createClient();

    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (!user) {
      throw new Error(
        "Unauthorized."
      );
    }

    const { data, error } =
      await supabase
        .from("wishlist_items")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      throw error;
    }

    return (
      data ?? []
    ) as WishlistItem[];
  }

  static async createItem(
    values: {
      itemName: string;
      targetPrice: number;
      currentPrice?: number;
      priority: string;
      targetDate?: string;
      notes?: string;
    }
  ) {
    const supabase =
      await createClient();

    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (!user) {
      throw new Error(
        "Unauthorized."
      );
    }

    const { error } =
      await supabase
        .from("wishlist_items")
        .insert({
          user_id: user.id,

          item_name:
            values.itemName,

          target_price:
            values.targetPrice,

          current_price:
            values.currentPrice ??
            null,

          priority:
            values.priority,

          target_date:
            values.targetDate ||
            null,

          notes:
            values.notes ||
            null,

          purchased: false,
        });

    if (error) {
      throw error;
    }
  }

  static async deleteItem(
    itemId: string
  ) {
    const supabase =
      await createClient();

    const { error } =
      await supabase
        .from("wishlist_items")
        .delete()
        .eq("id", itemId);

    if (error) {
      throw error;
    }
  }

  static async togglePurchased(
    itemId: string,
    purchased: boolean
  ) {
    const supabase =
      await createClient();

    const { error } =
      await supabase
        .from("wishlist_items")
        .update({
          purchased,
        })
        .eq("id", itemId);

    if (error) {
      throw error;
    }
  }
}