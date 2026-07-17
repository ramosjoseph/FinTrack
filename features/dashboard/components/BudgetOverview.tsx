import type { Expense } from "@/features/expenses/types/expense";
import type { PayrollSettings } from "@/features/payroll/types/payroll";

interface Props {
  expenses: Expense[];
  payroll: PayrollSettings | null;
}

export default function BudgetOverview({
  expenses,
  payroll,
}: Props) {
  if (!payroll) {
    return null;
  }

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
    payroll.monthly_salary;

  const remainingBudget =
    monthlySalary - monthlyExpenses;

  const budgetUsed =
    monthlySalary > 0
      ? (monthlyExpenses /
          monthlySalary) *
        100
      : 0;

  return (
    <div className="rounded-xl border bg-card p-6">
      <h2 className="text-xl font-semibold">
        Budget Overview
      </h2>

      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <p className="text-sm text-muted-foreground">
            Monthly Salary
          </p>

          <p className="text-2xl font-bold">
            ₱
            {monthlySalary.toLocaleString(
              "en-PH",
              {
                minimumFractionDigits: 2,
              }
            )}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Monthly Expenses
          </p>

          <p className="text-2xl font-bold">
            ₱
            {monthlyExpenses.toLocaleString(
              "en-PH",
              {
                minimumFractionDigits: 2,
              }
            )}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Remaining Budget
          </p>

          <p
            className={`text-2xl font-bold ${
              remainingBudget >= 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            ₱
            {remainingBudget.toLocaleString(
              "en-PH",
              {
                minimumFractionDigits: 2,
              }
            )}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Budget Used
          </p>

          <p className="text-2xl font-bold">
            {budgetUsed.toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
}