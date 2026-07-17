import type { SavingsGoal } from "../types/savings";

interface Props {
  goals: SavingsGoal[];
}

export default function SavingsMilestones({
  goals,
}: Props) {
  if (goals.length === 0) {
    return null;
  }

  const totalRemaining = goals.reduce(
    (sum, goal) =>
      sum +
      Math.max(
        goal.target_amount -
          goal.current_amount,
        0
      ),
    0
  );

  const highestProgressGoal =
    goals.reduce((best, current) => {
      const bestProgress =
        best.target_amount > 0
          ? (best.current_amount /
              best.target_amount) *
            100
          : 0;

      const currentProgress =
        current.target_amount > 0
          ? (current.current_amount /
              current.target_amount) *
            100
          : 0;

      return currentProgress >
        bestProgress
        ? current
        : best;
    });

  const closestGoal = goals.reduce(
    (closest, current) => {
      const closestRemaining =
        Math.max(
          closest.target_amount -
            closest.current_amount,
          0
        );

      const currentRemaining =
        Math.max(
          current.target_amount -
            current.current_amount,
          0
        );

      return currentRemaining <
        closestRemaining
        ? current
        : closest;
    }
  );

  const completedGoals = goals.filter(
    (goal) =>
      goal.current_amount >=
      goal.target_amount
  ).length;

  const highestProgress =
    highestProgressGoal.target_amount >
    0
      ? (highestProgressGoal.current_amount /
          highestProgressGoal.target_amount) *
        100
      : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Closest Goal
        </p>

        <h2 className="mt-2 text-xl font-bold">
          {closestGoal.goal_name}
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          ₱
          {Math.max(
            closestGoal.target_amount -
              closestGoal.current_amount,
            0
          ).toLocaleString("en-PH", {
            minimumFractionDigits: 2,
          })}
          {" "}remaining
        </p>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Highest Progress
        </p>

        <h2 className="mt-2 text-xl font-bold">
          {highestProgressGoal.goal_name}
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          {highestProgress.toFixed(1)}%
          complete
        </p>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Goals Completed
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {completedGoals}
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          out of {goals.length} goals
        </p>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Total Remaining
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          ₱
          {totalRemaining.toLocaleString(
            "en-PH",
            {
              minimumFractionDigits: 2,
            }
          )}
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Needed to complete all goals
        </p>
      </div>
    </div>
  );
}