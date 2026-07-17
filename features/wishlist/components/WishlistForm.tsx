"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { createWishlistItemAction } from "../actions/create-wishlist-item";

export default function WishlistForm() {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  const [error, setError] = useState("");

  async function submit(
    formData: FormData
  ) {
    setError("");

    startTransition(async () => {
      const result =
        await createWishlistItemAction(
          formData
        );

      if (!result.success) {
        setError(
          result.error ??
            "Something went wrong."
        );

        return;
      }

      router.refresh();
    });
  }

  return (
    <form
      action={submit}
      className="rounded-xl border bg-card p-6 space-y-6"
    >
      <div>
        <h2 className="text-xl font-semibold">
          Add Wishlist Item
        </h2>

        <p className="text-sm text-muted-foreground">
          Track things you want to buy.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="itemName">
          Item Name
        </Label>

        <Input
          id="itemName"
          name="itemName"
          required
          placeholder="e.g. iPhone 17 Pro"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="targetPrice">
          Target Price
        </Label>

        <Input
          id="targetPrice"
          name="targetPrice"
          type="number"
          min="0"
          step="0.01"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="priority">
          Priority
        </Label>

        <select
          id="priority"
          name="priority"
          className="w-full rounded-md border px-3 py-2"
          defaultValue="medium"
        >
          <option value="low">
            Low
          </option>

          <option value="medium">
            Medium
          </option>

          <option value="high">
            High
          </option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="targetDate">
          Target Date
        </Label>

        <Input
          id="targetDate"
          name="targetDate"
          type="date"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">
          Notes
        </Label>

        <Input
          id="notes"
          name="notes"
          placeholder="Optional"
        />
      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={isPending}
      >
        {isPending
          ? "Saving..."
          : "Add Item"}
      </Button>
    </form>
  );
}