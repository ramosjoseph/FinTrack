"use server";

import { revalidatePath } from "next/cache";

import { WishlistService } from "../services/wishlist.service";

export async function createWishlistItemAction(
  formData: FormData
) {
  try {
    await WishlistService.createItem({
      itemName: String(
        formData.get("itemName")
      ),

      targetPrice: Number(
        formData.get("targetPrice")
      ),

      priority: String(
        formData.get("priority")
      ),

      targetDate: String(
        formData.get("targetDate")
      ),

      notes:
        String(
          formData.get("notes")
        ) || "",
    });

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
          : JSON.stringify(error),
    };
  }
}