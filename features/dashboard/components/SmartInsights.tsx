import type { Expense } from "@/features/expenses/types/expense";
import type { PayrollSettings } from "@/features/payroll/types/payroll";
import type { SavingsGoal } from "@/features/savings/types/savings";

interface Props {
  expenses: Expense[];
  payroll: PayrollSettings | null;
  goals: SavingsGoal[];
}

export default function SmartInsights({
  expenses,
  payroll,
  goals,
}: Props) {
  const now = new Date();

  const monthlyExpensesList = expenses.filter(
    (expense) => {
      const date = new Date(
        expense.expense_date
      );

      return (
        date.getMonth() ===
          now.getMonth() &&
        date.getFullYear() ===
          now.getFullYear()
      );
    }
  );

  const monthlyExpenses =
    monthlyExpensesList.reduce(
      (sum, expense) =>
        sum + Number(expense.amount),
      0
    );

  const salary =
    payroll?.monthly_salary ?? 0;

  const remainingBudget =
    salary - monthlyExpenses;

  const categoryTotals =
    monthlyExpensesList.reduce(
      (
        acc: Record<string, number>,
        expense
      ) => {
        const category =
          expense.expense_categories
            ?.name ??
          "Uncategorized";

        acc[category] =
          (acc[category] ?? 0) +
          Number(expense.amount);

        return acc;
      },
      {}
    );

  const highestCategory =
    Object.entries(categoryTotals).sort(
      (a, b) => b[1] - a[1]
    )[0];

  const topGoal = [...goals].sort(
    (a, b) =>
      b.current_amount /
        b.target_amount -
      a.current_amount /
        a.target_amount
  )[0];

  const atRiskGoal = goals.find(
    (goal) => {
      if (
        !goal.deadline ||
        goal.monthly_contribution <= 0
      ) {
        return false;
      }

      const remaining =
        goal.target_amount -
        goal.current_amount;

      const monthsNeeded =
        remaining /
        goal.monthly_contribution;

      const deadline =
        new Date(goal.deadline);

      const monthsUntilDeadline =
        (deadline.getFullYear() -
          now.getFullYear()) *
          12 +
        (deadline.getMonth() -
          now.getMonth());

      return (
        monthsNeeded >
        monthsUntilDeadline
      );
    }
  );

  const daysPassed =
    now.getDate();

  const daysInMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate();

  const projectedMonthEndExpenses =
    daysPassed > 0
      ? (monthlyExpenses /
          daysPassed) *
        daysInMonth
      : 0;

  return (
    <div className="rounded-xl border bg-card p-6">
      <h2 className="text-lg font-semibold">
        Smart Insights
      </h2>

      <p className="mt-1 text-sm text-muted-foreground">
        Personalized insights based on your
        spending and savings activity.
      </p>

      <div className="mt-5 space-y-4">
        <div className="rounded-lg border p-4">
          <p className="text-sm">
            💰 Remaining Budget
          </p>

          <p className="mt-1 font-semibold">
            ₱
            {remainingBudget.toLocaleString(
              "en-PH",
              {
                minimumFractionDigits: 2,
              }
            )}
          </p>
        </div>

        {highestCategory && (
          <div className="rounded-lg border p-4">
            <p className="text-sm">
              📊 Highest Spending Category
            </p>

            <p className="mt-1 font-semibold">
              {highestCategory[0]}
            </p>

            <p className="text-sm text-muted-foreground">
              ₱
              {highestCategory[1].toLocaleString(
                "en-PH",
                {
                  minimumFractionDigits: 2,
                }
              )}
            </p>
          </div>
        )}

        {topGoal && (
          <div className="rounded-lg border p-4">
            <p className="text-sm">
              🎯 Closest Goal to Completion
            </p>

            <p className="mt-1 font-semibold">
              {topGoal.goal_name}
            </p>

            <p className="text-sm text-muted-foreground">
              {(
                (topGoal.current_amount /
                  topGoal.target_amount) *
                100
              ).toFixed(1)}
              % completed
            </p>
          </div>
        )}

        <div className="rounded-lg border p-4">
          <p className="text-sm">
            📈 Projected Month-End Expenses
          </p>

          <p className="mt-1 font-semibold">
            ₱
            {projectedMonthEndExpenses.toLocaleString(
              "en-PH",
              {
                minimumFractionDigits: 2,
              }
            )}
          </p>
        </div>

        {atRiskGoal && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
            <p className="text-sm font-medium text-red-600">
              ⚠ Goal At Risk
            </p>

            <p className="mt-1 font-semibold">
              {atRiskGoal.goal_name}
            </p>

            <p className="text-sm text-muted-foreground">
              At the current contribution
              rate, you may miss the target
              date.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}