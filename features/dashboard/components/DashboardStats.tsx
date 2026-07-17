import {
  Wallet,
  Landmark,
  Target,
  TrendingDown,
} from "lucide-react";

import StatCard from "./StatCard";

import type { Expense } from "@/features/expenses/types/expense";
import type { PayrollSettings } from "@/features/payroll/types/payroll";
import type { SavingsGoal } from "@/features/savings/types/savings";

interface DashboardStatsProps {
  expenses: Expense[];
  payroll: PayrollSettings | null;
  goals: SavingsGoal[];
}

export default function DashboardStats({
  expenses,
  payroll,
  goals,
}: DashboardStatsProps) {
  const now = new Date();

  const monthlyExpenses = expenses
    .filter((expense) => {
      const date = new Date(
        expense.expense_date
      );

      return (
        date.getMonth() ===
          now.getMonth() &&
        date.getFullYear() ===
          now.getFullYear()
      );
    })
    .reduce(
      (sum, expense) =>
        sum + Number(expense.amount),
      0
    );

  const monthlySalary =
    payroll?.monthly_salary ?? 0;

  const estimatedBalance =
    monthlySalary - monthlyExpenses;

  const totalTarget = goals.reduce(
    (sum, goal) =>
      sum + Number(goal.target_amount),
    0
  );

  const totalSaved = goals.reduce(
    (sum, goal) =>
      sum + Number(goal.current_amount),
    0
  );

  const savingsProgress =
    totalTarget > 0
      ? (totalSaved / totalTarget) * 100
      : 0;

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Current Balance"
        value={`₱${estimatedBalance.toLocaleString(
          "en-PH",
          {
            minimumFractionDigits: 2,
          }
        )}`}
        description="Salary minus monthly expenses"
        icon={
          <Wallet className="h-6 w-6 text-primary" />
        }
      />

      <StatCard
        title="Monthly Salary"
        value={`₱${monthlySalary.toLocaleString(
          "en-PH",
          {
            minimumFractionDigits: 2,
          }
        )}`}
        description="Payroll settings"
        icon={
          <Landmark className="h-6 w-6 text-primary" />
        }
      />

      <StatCard
        title="Monthly Expenses"
        value={`₱${monthlyExpenses.toLocaleString(
          "en-PH",
          {
            minimumFractionDigits: 2,
          }
        )}`}
        description="This month"
        icon={
          <TrendingDown className="h-6 w-6 text-primary" />
        }
      />

      <StatCard
        title="Savings Progress"
        value={`${savingsProgress.toFixed(
          1
        )}%`}
        description="Across all savings goals"
        icon={
          <Target className="h-6 w-6 text-primary" />
        }
      />
    </section>
  );
}