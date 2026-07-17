import { AlertTriangle } from "lucide-react";

import type { Expense } from "@/features/expenses/types/expense";
import type { PayrollSettings } from "@/features/payroll/types/payroll";

interface Props {
  expenses: Expense[];
  payroll: PayrollSettings | null;
}

export default function BudgetAlert({
  expenses,
  payroll,
}: Props) {
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

  const salary =
    payroll?.monthly_salary ?? 0;

  if (!salary) return null;

  const percentUsed =
    (monthlyExpenses / salary) * 100;

  let title = "";
  let description = "";
  let styles = "";

  if (percentUsed >= 100) {
    title = "Budget Exceeded";
    description =
      "Your expenses are higher than your monthly income.";
    styles =
      "border-red-500 bg-red-500/10";
  } else if (percentUsed >= 90) {
    title = "Critical Budget Warning";
    description =
      "You have used more than 90% of your monthly income.";
    styles =
      "border-orange-500 bg-orange-500/10";
  } else if (percentUsed >= 70) {
    title = "Budget Warning";
    description =
      "You have used more than 70% of your monthly income.";
    styles =
      "border-yellow-500 bg-yellow-500/10";
  } else {
    return null;
  }

  return (
    <div
      className={`rounded-xl border p-4 ${styles}`}
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5" />

        <div>
          <h2 className="font-semibold">
            {title}
          </h2>

          <p className="text-sm text-muted-foreground">
            {description}
          </p>

          <p className="mt-2 text-sm font-medium">
            {percentUsed.toFixed(1)}%
            of monthly income used.
          </p>
        </div>
      </div>
    </div>
  );
}