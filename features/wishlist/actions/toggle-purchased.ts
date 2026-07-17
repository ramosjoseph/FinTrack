"use server";

import { revalidatePath } from "next/cache";

import { WishlistService } from "../services/wishlist.service";

export async function togglePurchasedAction(
  itemId: string,
  purchased: boolean
) {
  try {
    await WishlistService.togglePurchased(
      itemId,
      purchased
    );

    revalidatePath("/wishlist");

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
    };
  }
}