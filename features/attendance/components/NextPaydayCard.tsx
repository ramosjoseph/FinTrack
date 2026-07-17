import type { AttendanceLog } from "../types/attendance";
import type { PayrollSettings } from "@/features/payroll/types/payroll";

interface Props {
  logs: AttendanceLog[];
  payroll: PayrollSettings | null;
}

export default function NextPaydayCard({
  logs,
  payroll,
}: Props) {
  if (!payroll) return null;

  const today = new Date();

  const currentDay =
    today.getDate();

  const isFirstCutoff =
    currentDay <=
    payroll.cutoff_day_1;

  const nextPayday = new Date(
    today.getFullYear(),
    today.getMonth(),
    isFirstCutoff
      ? payroll.payday_1
      : payroll.payday_2
  );

  if (nextPayday < today) {
    nextPayday.setMonth(
      nextPayday.getMonth() + 1
    );
  }

  const daysRemaining = Math.ceil(
    (nextPayday.getTime() -
      today.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const cutoffLogs =
    logs.filter((log) => {
      const date = new Date(
        log.work_date
      );

      const day =
        date.getDate();

      return isFirstCutoff
        ? day <=
            payroll.cutoff_day_1
        : day >
            payroll.cutoff_day_1;
    });

  const workingDaysPerMonth =
    payroll.work_days_per_week === 6
      ? 26
      : 22;

  const dailyRate =
    payroll.monthly_salary /
    workingDaysPerMonth;

  const hourlyRate =
    dailyRate /
    payroll.work_hours_per_day;

  const regularHours =
    cutoffLogs.reduce(
      (sum, log) => {
        if (
          log.status !==
          "present"
        ) {
          return sum;
        }

        return (
          sum +
          Number(
            log.hours_worked
          )
        );
      },
      0
    );

  const overtimeHours =
    cutoffLogs.reduce(
      (sum, log) =>
        sum +
        Number(
          log.overtime_hours
        ),
      0
    );

  const estimatedPay =
    regularHours *
      hourlyRate +
    overtimeHours *
      hourlyRate *
      1.25;

  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Next Payday
          </h2>

          <p className="text-sm text-muted-foreground">
            Estimated payout for the
            current cutoff
          </p>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold">
            {nextPayday.toLocaleDateString(
              "en-PH",
              {
                month: "long",
                day: "numeric",
              }
            )}
          </p>

          <p className="text-sm text-muted-foreground">
            {daysRemaining} day
            {daysRemaining !== 1
              ? "s"
              : ""}{" "}
            remaining
          </p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm text-muted-foreground">
          Estimated Salary
        </p>

        <p className="mt-1 text-3xl font-bold text-green-600">
          ₱
          {estimatedPay.toLocaleString(
            "en-PH",
            {
              minimumFractionDigits: 2,
            }
          )}
        </p>
      </div>
    </div>
  );
}