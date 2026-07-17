"use client";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import type { Expense } from "@/features/expenses/types/expense";

interface RecentActivityProps {
  expenses: Expense[];
}

export default function RecentActivity({
  expenses,
}: RecentActivityProps) {
  const recentExpenses = [...expenses].slice(0, 5);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>
            Recent Activity
          </CardTitle>

          <CardDescription>
            Your latest expense transactions.
          </CardDescription>
        </div>

        <Button
          asChild
          variant="outline"
        >
          <Link href="/expenses">
            View All
          </Link>
        </Button>
      </CardHeader>

      <CardContent>
        {recentExpenses.length === 0 ? (
          <div className="py-10 text-center text-muted-foreground">
            No recent expenses.
          </div>
        ) : (
          <div className="space-y-4">
            {recentExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between border-b pb-4 last:border-0"
              >
                <div>
                  <p className="font-medium">
                    {expense.expense_name}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {expense.expense_categories?.name ?? "Uncategorized"}
                    {" • "}
                    {new Date(
                      expense.expense_date
                    ).toLocaleDateString("en-PH", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="font-semibold">
                  ₱
                  {Number(expense.amount).toLocaleString(
                    "en-PH",
                    {
                      minimumFractionDigits: 2,
                    }
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}