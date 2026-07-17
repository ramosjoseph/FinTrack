"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { deleteWishlistItemAction } from "../actions/delete-wishlist-item";

interface Props {
  itemId: string;
}

export default function DeleteWishlistButton({
  itemId,
}: Props) {
  const router =
    useRouter();

  const [
    isPending,
    startTransition,
  ] = useTransition();

  function handleDelete() {
    const confirmed =
      window.confirm(
        "Delete this wishlist item?"
      );

    if (!confirmed) {
      return;
    }

    startTransition(
      async () => {
        await deleteWishlistItemAction(
          itemId
        );

        router.refresh();
      }
    );
  }

  return (
    <Button
      size="icon"
      variant="destructive"
      disabled={isPending}
      onClick={
        handleDelete
      }
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}