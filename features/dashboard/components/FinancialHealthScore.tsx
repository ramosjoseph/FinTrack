import type { Expense } from "@/features/expenses/types/expense";
import type { PayrollSettings } from "@/features/payroll/types/payroll";

interface Props {
  expenses: Expense[];
  payroll: PayrollSettings | null;
}

export default function FinancialHealthScore({
  expenses,
  payroll,
}: Props) {
  const now = new Date();

  const monthlyExpenses = expenses
    .filter((expense) => {
      const date = new Date(expense.expense_date);

      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    })
    .reduce(
      (sum, expense) =>
        sum + Number(expense.amount),
      0
    );

  const salary =
    payroll?.monthly_salary ?? 0;

  const expenseRatio =
    salary > 0
      ? (monthlyExpenses / salary) * 100
      : 0;

  const remainingBudget =
    salary - monthlyExpenses;

  let score = 0;

  if (salary > 0) {
    const ratio =
      monthlyExpenses / salary;

    if (ratio <= 0.5) {
      score = 100;
    } else if (ratio <= 0.7) {
      score = 80;
    } else if (ratio <= 0.9) {
      score = 60;
    } else {
      score = 40;
    }
  }

  const status =
    score >= 90
      ? "Excellent"
      : score >= 75
      ? "Good"
      : score >= 60
      ? "Fair"
      : "Needs Attention";

  const recommendation =
    score >= 90
      ? "You are managing your finances exceptionally well."
      : score >= 75
      ? "Your spending is healthy. Keep it up."
      : score >= 60
      ? "Consider reducing discretionary expenses."
      : "Your expenses are approaching or exceeding your income.";

  const colorClass =
    score >= 90
      ? "text-green-600"
      : score >= 75
      ? "text-blue-600"
      : score >= 60
      ? "text-yellow-600"
      : "text-red-600";

  const barClass =
    score >= 90
      ? "bg-green-500"
      : score >= 75
      ? "bg-blue-500"
      : score >= 60
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Financial Health Score
          </h2>

          <p className="text-sm text-muted-foreground">
            Based on your spending vs income this month
          </p>
        </div>

        <div className="text-right">
          <p
            className={`text-4xl font-bold ${colorClass}`}
          >
            {score}
          </p>

          <p
            className={`text-sm font-medium ${colorClass}`}
          >
            {status}
          </p>
        </div>
      </div>

      <div className="mt-4 h-3 rounded-full bg-muted">
        <div
          className={`h-3 rounded-full transition-all ${barClass}`}
          style={{
            width: `${score}%`,
          }}
        />
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        {recommendation}
      </p>

      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Monthly Income
          </span>

          <span className="font-medium">
            ₱
            {salary.toLocaleString("en-PH", {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Monthly Expenses
          </span>

          <span className="font-medium">
            ₱
            {monthlyExpenses.toLocaleString("en-PH", {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Spending Rate
          </span>

          <span className="font-medium">
            {expenseRatio.toFixed(1)}%
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Remaining Budget
          </span>

          <span
            className={
              remainingBudget >= 0
                ? "font-medium text-green-600"
                : "font-medium text-red-600"
            }
          >
            ₱
            {remainingBudget.toLocaleString("en-PH", {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
    </div>
  );
}