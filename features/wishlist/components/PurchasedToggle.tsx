"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";

import { togglePurchasedAction } from "../actions/toggle-purchased";

interface Props {
  itemId: string;
  purchased: boolean;
}

export default function PurchasedToggle({
  itemId,
  purchased,
}: Props) {
  const router =
    useRouter();

  const [
    isPending,
    startTransition,
  ] = useTransition();

  function handleToggle() {
    startTransition(
      async () => {
        await togglePurchasedAction(
          itemId,
          !purchased
        );

        router.refresh();
      }
    );
  }

  return (
    <Button
      size="sm"
      variant={
        purchased
          ? "secondary"
          : "default"
      }
      disabled={isPending}
      onClick={
        handleToggle
      }
    >
      {purchased
        ? "Purchased"
        : "Mark Purchased"}
    </Button>
  );
}