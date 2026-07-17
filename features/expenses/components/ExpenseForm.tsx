"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  expenseSchema,
  type ExpenseFormValues,
} from "../validation/expense-schema";

import { saveExpenseAction } from "../actions/save-expense";

import ExpenseCard from "./ExpenseCard";
import ExpenseSection from "./ExpenseSection";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

interface ExpenseFormProps {
  categories: {
    id: string;
    name: string;
    icon: string | null;
    color: string | null;
  }[];
}

export default function ExpenseForm({
  categories,
}: ExpenseFormProps) {
  const router = useRouter();

  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");

  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),

    defaultValues: {
      expenseName: "",
      categoryId: "",
      amount: 0,
      expenseDate: new Date().toISOString().split("T")[0],
      notes: "",
    },
  });

  async function onSubmit(values: ExpenseFormValues) {
    setServerError("");
    setServerSuccess("");

    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    startTransition(async () => {
      const result = await saveExpenseAction(formData);

      if (!result.success) {
        setServerError(result.error ?? "Unknown error.");
        return;
      }

      setServerSuccess(result.message ?? "");

      setTimeout(() => {
        router.refresh();
      }, 1000);
    });
  }

  return (
    <ExpenseCard
      title="Add Expense"
      description="Record a new expense."
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <ExpenseSection
          title="Expense Details"
          description="Enter the details of your expense."
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="expenseName">
                Expense Name
              </Label>

              <Input
                id="expenseName"
                placeholder="Lunch, Grab, Grocery..."
                {...register("expenseName")}
              />

              {errors.expenseName && (
                <p className="text-sm text-destructive">
                  {errors.expenseName.message}
                </p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="categoryId">
                Category
              </Label>

              <select
                id="categoryId"
                {...register("categoryId")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">
                  Select a category
                </option>

                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>

              {errors.categoryId && (
                <p className="text-sm text-destructive">
                  {errors.categoryId.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">
                Amount
              </Label>

              <Input
                id="amount"
                type="number"
                step="0.01"
                {...register("amount")}
              />

              {errors.amount && (
                <p className="text-sm text-destructive">
                  {errors.amount.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="expenseDate">
                Expense Date
              </Label>

              <Input
                id="expenseDate"
                type="date"
                {...register("expenseDate")}
              />

              {errors.expenseDate && (
                <p className="text-sm text-destructive">
                  {errors.expenseDate.message}
                </p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes">
                Notes
              </Label>

              <Input
                id="notes"
                placeholder="Optional notes..."
                {...register("notes")}
              />

              {errors.notes && (
                <p className="text-sm text-destructive">
                  {errors.notes.message}
                </p>
              )}
            </div>
          </div>
        </ExpenseSection>

        {serverError && (
          <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3">
            <p className="text-sm text-destructive">
              {serverError}
            </p>
          </div>
        )}

        {serverSuccess && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-800 dark:bg-emerald-950/30">
            <p className="text-sm text-emerald-700 dark:text-emerald-400">
              {serverSuccess}
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
              Saving Expense...
            </>
          ) : (
            "Add Expense"
          )}
        </Button>
      </form>
    </ExpenseCard>
  );
}