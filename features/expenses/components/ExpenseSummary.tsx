"use client";

import type { Expense } from "../types/expense";

import {
  Wallet,
  CalendarDays,
  ReceiptText,
  Tags,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ExpenseSummaryProps {
  expenses: Expense[];
}

export default function ExpenseSummary({
  expenses,
}: ExpenseSummaryProps) {
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  const now = new Date();

  const thisMonthExpenses = expenses.filter((expense) => {
    const date = new Date(expense.expense_date);

    return (
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  });

  const monthlyTotal = thisMonthExpenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  const categoryTotals = expenses.reduce(
    (acc, expense) => {
      const category =
        expense.expense_categories?.name ??
        "Uncategorized";

      acc[category] =
        (acc[category] ?? 0) +
        Number(expense.amount);

      return acc;
    },
    {} as Record<string, number>
  );

  const topCategory =
    Object.entries(categoryTotals).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0] ?? "-";

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Total Expenses
          </CardTitle>

          <Wallet className="h-5 w-5 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          <div className="text-3xl font-bold">
            ₱
            {totalExpenses.toLocaleString("en-PH", {
              minimumFractionDigits: 2,
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            This Month
          </CardTitle>

          <CalendarDays className="h-5 w-5 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          <div className="text-3xl font-bold">
            ₱
            {monthlyTotal.toLocaleString("en-PH", {
              minimumFractionDigits: 2,
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Transactions
          </CardTitle>

          <ReceiptText className="h-5 w-5 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          <div className="text-3xl font-bold">
            {expenses.length}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Top Category
          </CardTitle>

          <Tags className="h-5 w-5 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          <div className="text-2xl font-bold">
            {topCategory}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}