import type { SavingsGoal } from "../types/savings";

interface Props {
  goals: SavingsGoal[];
}

export default function SavingsForecast({
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

  const totalMonthlyContribution =
    goals.reduce(
      (sum, goal) =>
        sum + goal.monthly_contribution,
      0
    );

  const monthsToFinishAll =
    totalMonthlyContribution > 0
      ? Math.ceil(
          totalRemaining /
            totalMonthlyContribution
        )
      : null;

  const projectedDate =
    monthsToFinishAll !== null
      ? new Date(
          new Date().setMonth(
            new Date().getMonth() +
              monthsToFinishAll
          )
        )
      : null;

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

  const highestRemainingGoal =
    goals.reduce((highest, current) => {
      const highestRemaining =
        Math.max(
          highest.target_amount -
            highest.current_amount,
          0
        );

      const currentRemaining =
        Math.max(
          current.target_amount -
            current.current_amount,
          0
        );

      return currentRemaining >
        highestRemaining
        ? current
        : highest;
    });

  return (
    <div className="rounded-xl border bg-card p-6">
      <h2 className="text-xl font-semibold">
        Savings Forecast
      </h2>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-sm text-muted-foreground">
            Projected Completion of
            All Goals
          </p>

          <p className="mt-1 text-lg font-semibold">
            {projectedDate
              ? projectedDate.toLocaleDateString(
                  "en-PH",
                  {
                    year: "numeric",
                    month: "long",
                  }
                )
              : "No monthly contributions set"}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Months Remaining
          </p>

          <p className="mt-1 text-lg font-semibold">
            {monthsToFinishAll ??
              "N/A"}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Closest Goal
          </p>

          <p className="mt-1 text-lg font-semibold">
            {closestGoal.goal_name}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Biggest Remaining Goal
          </p>

          <p className="mt-1 text-lg font-semibold">
            {
              highestRemainingGoal.goal_name
            }
          </p>
        </div>
      </div>
    </div>
  );
}