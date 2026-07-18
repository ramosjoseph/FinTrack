"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  expenseSchema,
  type ExpenseFormValues,
} from "../validation/expense-schema";

import { updateExpenseAction } from "../actions/update-expense";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { Pencil } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Expense,
  ExpenseCategory,
} from "../types/expense";

interface EditExpenseDialogProps {
  expense: Expense;
  categories: ExpenseCategory[];
}

export default function EditExpenseDialog({
  expense,
  categories,
}: EditExpenseDialogProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<ExpenseFormValues>({
  resolver: zodResolver(expenseSchema) as any,

  defaultValues: {
      expenseName: expense.expense_name,
      categoryId: expense.category_id,
      amount: Number(expense.amount),
      expenseDate: expense.expense_date,
      notes: expense.notes ?? "",
    },
  });

  async function onSubmit(values: ExpenseFormValues) {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    startTransition(async () => {
      const result = await updateExpenseAction(
        expense.id,
        formData
      );

      if (result.success) {
        setOpen(false);
        router.refresh();
      }
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          title="Edit Expense"
        >
          <Pencil className="h-4 w-4 text-blue-500" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Expense</DialogTitle>

          <DialogDescription>
            Update the details of this expense.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="expenseName">
              Expense Name
            </Label>

            <Input
              id="expenseName"
              {...register("expenseName")}
            />

            {errors.expenseName && (
              <p className="text-sm text-destructive">
                {errors.expenseName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
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
  {...register("amount", {
    valueAsNumber: true,
  })}
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

          <div className="space-y-2">
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

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}