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
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface DailyExpenseChartProps {
  expenses: Expense[];
}

export default function DailyExpenseChart({
  expenses,
}: DailyExpenseChartProps) {
  const chartData = useMemo(() => {
    const now = new Date();

    const grouped: Record<string, number> = {};

    expenses.forEach((expense) => {
      const date = new Date(expense.expense_date);

      const isCurrentMonth =
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();

      if (!isCurrentMonth) return;

      const day = date.toLocaleDateString(
        "en-PH",
        {
          month: "short",
          day: "numeric",
        }
      );

      grouped[day] =
        (grouped[day] ?? 0) +
        Number(expense.amount);
    });

    return Object.entries(grouped).map(
      ([day, total]) => ({
        day,
        total,
      })
    );
  }, [expenses]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Daily Expenses This Month
        </CardTitle>

        <CardDescription>
          Track your spending day by day.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="h-80">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="day" />

              <YAxis />

              <Tooltip
                formatter={(value: number) => [
                  `₱${value.toLocaleString(
                    "en-PH",
                    {
                      minimumFractionDigits: 2,
                    }
                  )}`,
                  "Expenses",
                ]}
              />

              <Bar
                dataKey="total"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}