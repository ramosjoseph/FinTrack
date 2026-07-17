"use client";

import type { SavingsGoal } from "../types/savings";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  goals: SavingsGoal[];
}

export default function SavingsProgressChart({
  goals,
}: Props) {
  const chartData = goals.map((goal) => ({
    name: goal.goal_name,
    progress:
      goal.target_amount > 0
        ? Number(
            (
              (goal.current_amount /
                goal.target_amount) *
              100
            ).toFixed(1)
          )
        : 0,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Savings Goal Progress
        </CardTitle>

        <CardDescription>
          Progress of all active savings goals.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {chartData.length === 0 ? (
          <div className="flex h-80 items-center justify-center text-muted-foreground">
            No savings goals available.
          </div>
        ) : (
          <div className="h-80">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis
                  domain={[0, 100]}
                />

                <Tooltip
                  formatter={(
                    value: number
                  ) => [
                    `${value}%`,
                    "Progress",
                  ]}
                />

                <Bar
                  dataKey="progress"
                  fill="hsl(var(--primary))"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}