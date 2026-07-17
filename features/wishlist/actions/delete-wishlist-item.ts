"use server";

import { revalidatePath } from "next/cache";

import { WishlistService } from "../services/wishlist.service";

export async function deleteWishlistItemAction(
  itemId: string
) {
  try {
    await WishlistService.deleteItem(
      itemId
    );

    revalidatePath("/wishlist");

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to delete item.",
    };
  }
}