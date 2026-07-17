"use client";

import { useState, useTransition } from "react";

import { Trash2 } from "lucide-react";

import { deleteExpenseAction } from "../actions/delete-expense";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface DeleteExpenseButtonProps {
  expenseId: string;
}

export default function DeleteExpenseButton({
  expenseId,
}: DeleteExpenseButtonProps) {
  const [error, setError] = useState("");

  const [isPending, startTransition] = useTransition();

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmed) {
      return;
    }

    setError("");

    startTransition(async () => {
      const result = await deleteExpenseAction(expenseId);

      if (!result.success) {
        setError(result.error ?? "Unable to delete expense.");
        return;
      }

      window.location.reload();
    });
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        disabled={isPending}
      >
        {isPending ? (
          <Spinner className="h-4 w-4" />
        ) : (
          <Trash2 className="h-4 w-4 text-red-500" />
        )}
      </Button>

      {error && (
        <p className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}