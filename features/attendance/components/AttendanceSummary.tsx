import type { AttendanceLog } from "../types/attendance";
import type { PayrollSettings } from "@/features/payroll/types/payroll";

interface Props {
  logs: AttendanceLog[];
  payroll: PayrollSettings | null;
}

export default function AttendanceSummary({
  logs,
  payroll,
}: Props) {
  const presentDays =
    logs.filter(
      (log) =>
        log.status === "present"
    ).length;

  const absentDays =
    logs.filter(
      (log) =>
        log.status === "absent"
    ).length;

  const totalHours =
    logs.reduce(
      (sum, log) =>
        sum +
        Number(log.hours_worked),
      0
    );

  const overtimeHours =
    logs.reduce(
      (sum, log) =>
        sum +
        Number(log.overtime_hours),
      0
    );

  const dailyRate =
    payroll?.monthly_salary
      ? payroll.monthly_salary /
        (payroll.work_days_per_week === 6
          ? 26
          : 22)
      : 0;

  const hourlyRate =
    payroll?.work_hours_per_day
      ? dailyRate /
        payroll.work_hours_per_day
      : 0;

  const paidHours =
    logs.reduce(
      (sum, log) => {
        if (
          log.status !==
          "present"
        ) {
          return sum;
        }

        return (
          sum +
          Number(log.hours_worked)
        );
      },
      0
    );

  const expectedSalary =
    paidHours * hourlyRate +
    overtimeHours *
      hourlyRate *
      1.25;

  return (
    <div className="grid gap-4 md:grid-cols-5">
      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Present Days
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {presentDays}
        </h2>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Absent Days
        </p>

        <h2 className="mt-2 text-3xl font-bold text-red-600">
          {absentDays}
        </h2>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Hours Worked
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {totalHours}
        </h2>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Overtime Hours
        </p>

        <h2 className="mt-2 text-3xl font-bold text-blue-600">
          {overtimeHours}
        </h2>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Estimated Salary
        </p>

        <h2 className="mt-2 text-3xl font-bold text-green-600">
          ₱
          {expectedSalary.toLocaleString(
            "en-PH",
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }
          )}
        </h2>

        <p className="mt-1 text-xs text-muted-foreground">
          Based on hours worked
        </p>
      </div>
    </div>
  );
}