"use client";

import { useMemo } from "react";

import type { Expense } from "@/features/expenses/types/expense";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface Props {
  expenses: Expense[];
}

export default function ExpenseCategoryChart({
  expenses,
}: Props) {
  const chartData = useMemo(() => {
    const grouped = new Map<
      string,
      {
        value: number;
        color: string;
      }
    >();

    expenses.forEach((expense) => {
      const category =
        expense.expense_categories?.name ??
        "Uncategorized";

      const color =
        expense.expense_categories?.color ??
        "#8884d8";

      const current =
        grouped.get(category);

      grouped.set(category, {
        value:
          (current?.value ?? 0) +
          Number(expense.amount),
        color,
      });
    });

    return [...grouped.entries()].map(
      ([name, data]) => ({
        name,
        value: data.value,
        color: data.color,
      })
    );
  }, [expenses]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Expense Categories
        </CardTitle>

        <CardDescription>
          Where your money is going
        </CardDescription>
      </CardHeader>

      <CardContent>
        {chartData.length === 0 ? (
          <div className="flex h-80 items-center justify-center text-muted-foreground">
            No expense data available.
          </div>
        ) : (
          <div className="h-80">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(
                      0
                    )}%`
                  }
                >
                  {chartData.map(
                    (entry, index) => (
                      <Cell
                        key={index}
                        fill={entry.color}
                      />
                    )
                  )}
                </Pie>

                <Tooltip
                  formatter={(
                    value: number
                  ) => [
                    `₱${value.toLocaleString(
                      "en-PH",
                      {
                        minimumFractionDigits: 2,
                      }
                    )}`,
                    "Amount",
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}