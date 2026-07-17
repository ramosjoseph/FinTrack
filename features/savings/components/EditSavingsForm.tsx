"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import type { SavingsGoal } from "../types/savings";

import { updateSavingsGoalAction } from "../actions/update-savings-goal";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

interface Props {
  goal: SavingsGoal;
  onSuccess?: () => void;
}

export default function EditSavingsForm({
  goal,
  onSuccess,
}: Props) {
  const router = useRouter();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isPending, startTransition] =
    useTransition();

  async function submit(
    formData: FormData
  ) {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const result =
        await updateSavingsGoalAction(
          goal.id,
          formData
        );

      if (!result.success) {
        setError(
          result.error ??
            "Unknown error."
        );
        return;
      }

      setSuccess(
        "Savings goal updated successfully."
      );

      router.refresh();

      setTimeout(() => {
        onSuccess?.();
      }, 500);
    });
  }

  return (
    <form
      action={submit}
      className="space-y-5"
    >
      <div className="space-y-2">
        <Label htmlFor="goalName">
          Goal Name
        </Label>

        <Input
          id="goalName"
          name="goalName"
          defaultValue={goal.goal_name}
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
          min="1"
          step="0.01"
          defaultValue={
            goal.target_amount
          }
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="currentAmount">
          Current Saved
        </Label>

        <Input
          id="currentAmount"
          name="currentAmount"
          type="number"
          min="0"
          step="0.01"
          defaultValue={
            goal.current_amount
          }
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
          defaultValue={
            goal.monthly_contribution
          }
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
          defaultValue={
            goal.deadline
              ? goal.deadline.split("T")[0]
              : ""
          }
        />
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3">
          <p className="text-sm text-destructive">
            {error}
          </p>
        </div>
      )}

      {success && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-800 dark:bg-emerald-950/30">
          <p className="text-sm text-emerald-700 dark:text-emerald-400">
            {success}
          </p>
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Spinner className="mr-2 h-4 w-4" />
            Saving Changes...
          </>
        ) : (
          "Save Changes"
        )}
      </Button>
    </form>
  );
}