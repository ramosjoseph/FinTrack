import type { AttendanceLog } from "../types/attendance";
import type { PayrollSettings } from "@/features/payroll/types/payroll";

interface Props {
  logs: AttendanceLog[];
  payroll: PayrollSettings | null;
}

export default function CutoffSalaryCard({
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

  const presentDays =
    cutoffLogs.filter(
      (log) =>
        log.status ===
        "present"
    ).length;

  const absentDays =
    cutoffLogs.filter(
      (log) =>
        log.status ===
        "absent"
    ).length;

  const cutoffSalary =
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
            Current Cutoff Salary
          </h2>

          <p className="text-sm text-muted-foreground">
            Estimated earnings for
            this cutoff period
          </p>
        </div>

        <div className="text-right">
          <p className="text-3xl font-bold text-green-600">
            ₱
            {cutoffSalary.toLocaleString(
              "en-PH",
              {
                minimumFractionDigits: 2,
              }
            )}
          </p>

          <p className="text-xs text-muted-foreground">
            {isFirstCutoff
              ? `Cutoff: 1-${payroll.cutoff_day_1}`
              : `Cutoff: ${
                  payroll.cutoff_day_1 +
                  1
                }-End`}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div>
          <p className="text-sm text-muted-foreground">
            Daily Rate
          </p>

          <p className="font-semibold">
            ₱
            {dailyRate.toLocaleString(
              "en-PH",
              {
                minimumFractionDigits: 2,
              }
            )}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Present Days
          </p>

          <p className="font-semibold text-green-600">
            {presentDays}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Absent Days
          </p>

          <p className="font-semibold text-red-600">
            {absentDays}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            OT Hours
          </p>

          <p className="font-semibold">
            {overtimeHours}
          </p>
        </div>
      </div>
    </div>
  );
}