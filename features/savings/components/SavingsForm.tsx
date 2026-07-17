"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { createSavingsGoalAction } from "../actions/create-savings-goal";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  onSuccess?: () => void;
}

export default function SavingsForm({
  onSuccess,
}: Props) {
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
        await createSavingsGoalAction(
          formData
        );

      if (!result.success) {
        setError(
          result.error ?? "Unknown error."
        );
        return;
      }

      router.refresh();

      onSuccess?.();
    });
  }

  return (
    <form
      action={submit}
      className="space-y-6"
    >
      <div>
        <h2 className="text-xl font-semibold">
          Create Savings Goal
        </h2>

        <p className="text-sm text-muted-foreground">
          Set a target and track your savings progress.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="goalName">
          Goal Name
        </Label>

        <Input
          id="goalName"
          name="goalName"
          placeholder="e.g. Emergency Fund"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="targetAmount">
          Target Amount
        </Label>

        <Input
          id="targetAmount"
          name="targetAmount"
          type="number"
          min="0"
          step="0.01"
          placeholder="e.g. 100000"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="currentAmount">
          Current Amount Saved
        </Label>

        <Input
          id="currentAmount"
          name="currentAmount"
          type="number"
          min="0"
          step="0.01"
          placeholder="e.g. 25000"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="monthlyContribution">
          Monthly Contribution
        </Label>

        <Input
          id="monthlyContribution"
          name="monthlyContribution"
          type="number"
          min="0"
          step="0.01"
          placeholder="e.g. 5000"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="deadline">
          Target Date
        </Label>

        <Input
          id="deadline"
          name="deadline"
          type="date"
        />
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3">
          <p className="text-sm text-destructive">
            {error}
          </p>
        </div>
      )}

      <div className="flex justify-end">
        <Button
          disabled={isPending}
          type="submit"
        >
          {isPending
            ? "Saving..."
            : "Create Goal"}
        </Button>
      </div>
    </form>
  );
}