import type { SavingsGoal } from "../types/savings";

interface Props {
  goals: SavingsGoal[];
}

export default function SavingsStats({
  goals,
}: Props) {
  const totalTarget = goals.reduce(
    (sum, goal) => sum + goal.target_amount,
    0
  );

  const totalSaved = goals.reduce(
    (sum, goal) => sum + goal.current_amount,
    0
  );

  const totalMonthlyContribution =
    goals.reduce(
      (sum, goal) =>
        sum + goal.monthly_contribution,
      0
    );

  const overallProgress =
    totalTarget > 0
      ? (totalSaved / totalTarget) * 100
      : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Total Saved
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          ₱
          {totalSaved.toLocaleString("en-PH", {
            minimumFractionDigits: 2,
          })}
        </h2>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Total Target
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          ₱
          {totalTarget.toLocaleString("en-PH", {
            minimumFractionDigits: 2,
          })}
        </h2>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Monthly Contribution
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          ₱
          {totalMonthlyContribution.toLocaleString(
            "en-PH",
            {
              minimumFractionDigits: 2,
            }
          )}
        </h2>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Overall Progress
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {overallProgress.toFixed(1)}%
        </h2>
      </div>
    </div>
  );
}