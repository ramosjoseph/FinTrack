"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Trash2 } from "lucide-react";

import { deleteSavingsGoalAction } from "../actions/delete-savings-goal";

import { Button } from "@/components/ui/button";

interface Props {
  goalId: string;
}

export default function DeleteSavingsButton({
  goalId,
}: Props) {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this savings goal?"
    );

    if (!confirmed) return;

    startTransition(async () => {
      const result =
        await deleteSavingsGoalAction(
          goalId
        );

      if (!result.success) {
        alert(
          result.error ??
            "Failed to delete goal."
        );
        return;
      }

      router.refresh();
    });
  }

  return (
    <Button
      type="button"
      variant="destructive"
      size="sm"
      disabled={isPending}
      onClick={handleDelete}
    >
      <Trash2 className="mr-2 h-4 w-4" />

      {isPending
        ? "Deleting..."
        : "Delete"}
    </Button>
  );
}