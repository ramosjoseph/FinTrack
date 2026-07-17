import type { SavingsGoal } from "../types/savings";

import EditSavingsDialog from "./EditSavingsDialog";
import DeleteSavingsButton from "./DeleteSavingsButton";

interface Props {
  goals: SavingsGoal[];
}

export default function SavingsSummary({
  goals,
}: Props) {
  if (goals.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-6">
        <p className="text-muted-foreground">
          No savings goals yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {goals.map((goal) => {
        const progress =
          goal.target_amount > 0
            ? (goal.current_amount /
                goal.target_amount) *
              100
            : 0;

        const remaining = Math.max(
          goal.target_amount -
            goal.current_amount,
          0
        );

        const isCompleted =
          progress >= 100;

        const monthsRemaining =
          goal.monthly_contribution > 0 &&
          remaining > 0
            ? Math.ceil(
                remaining /
                  goal.monthly_contribution
              )
            : null;

        const estimatedCompletionDate =
          monthsRemaining !== null
            ? new Date(
                new Date().setMonth(
                  new Date().getMonth() +
                    monthsRemaining
                )
              )
            : null;

        const targetDate = goal.deadline
          ? new Date(goal.deadline)
          : null;

        const isBehindSchedule =
          !!(
            targetDate &&
            estimatedCompletionDate &&
            estimatedCompletionDate >
              targetDate
          );

        const statusLabel = isCompleted
          ? "Completed"
          : isBehindSchedule
          ? "Behind Schedule"
          : "On Track";

        return (
          <div
            key={goal.id}
            className="rounded-xl border bg-card p-6"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold">
                    {goal.goal_name}
                  </h2>

                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      isCompleted
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : isBehindSchedule
                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    }`}
                  >
                    {statusLabel}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground">
                  Target Amount:
                  {" ₱"}
                  {goal.target_amount.toLocaleString(
                    "en-PH",
                    {
                      minimumFractionDigits: 2,
                    }
                  )}
                </p>

                <p className="text-sm text-muted-foreground">
                  Current Saved:
                  {" ₱"}
                  {goal.current_amount.toLocaleString(
                    "en-PH",
                    {
                      minimumFractionDigits: 2,
                    }
                  )}
                </p>

                <p className="text-sm text-muted-foreground">
                  Monthly Contribution:
                  {" ₱"}
                  {goal.monthly_contribution.toLocaleString(
                    "en-PH",
                    {
                      minimumFractionDigits: 2,
                    }
                  )}
                </p>

                {goal.deadline && (
                  <p className="text-sm text-muted-foreground">
                    Target Date:
                    {" "}
                    {new Date(
                      goal.deadline
                    ).toLocaleDateString(
                      "en-PH",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                )}

                {monthsRemaining !== null &&
                  !isCompleted && (
                    <p className="text-sm text-muted-foreground">
                      Months Remaining:
                      {" "}
                      {monthsRemaining}
                    </p>
                  )}

                {estimatedCompletionDate && (
                  <p className="text-sm text-muted-foreground">
                    Estimated Completion:
                    {" "}
                    {estimatedCompletionDate.toLocaleDateString(
                      "en-PH",
                      {
                        year: "numeric",
                        month: "long",
                      }
                    )}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-start gap-3 md:items-end">
                <div className="text-left md:text-right">
                  <p className="text-2xl font-bold">
                    {progress.toFixed(1)}%
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Remaining:
                    {" ₱"}
                    {remaining.toLocaleString(
                      "en-PH",
                      {
                        minimumFractionDigits: 2,
                      }
                    )}
                  </p>
                </div>

                <div className="flex gap-2">
                  <EditSavingsDialog
                    goal={goal}
                  />

                  <DeleteSavingsButton
                    goalId={goal.id}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-muted">
              <div
                className={`h-3 transition-all ${
                  isCompleted
                    ? "bg-green-500"
                    : isBehindSchedule
                    ? "bg-red-500"
                    : "bg-primary"
                }`}
                style={{
                  width: `${Math.min(
                    progress,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}