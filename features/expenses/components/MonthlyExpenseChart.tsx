"use client";

import { useMemo } from "react";

import type { Expense } from "../types/expense";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface MonthlyExpenseChartProps {
  expenses: Expense[];
}

export default function MonthlyExpenseChart({
  expenses,
}: MonthlyExpenseChartProps) {
  const chartData = useMemo(() => {
    const grouped = new Map<string, number>();

    expenses.forEach((expense) => {
      const date = new Date(expense.expense_date);

      const key = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      grouped.set(
        key,
        (grouped.get(key) ?? 0) + Number(expense.amount)
      );
    });

    return [...grouped.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, total]) => {
        const [year, month] = key.split("-");

        const label = new Date(
          Number(year),
          Number(month) - 1
        ).toLocaleString("en-PH", {
          month: "short",
          year: "2-digit",
        });

        return {
          month: label,
          total,
        };
      });
  }, [expenses]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Expenses</CardTitle>

        <CardDescription>
          Spending trend by month.
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
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip
                  formatter={(value: number) => [
                    `₱${value.toLocaleString("en-PH", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`,
                    "Expenses",
                  ]}
                />

                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}