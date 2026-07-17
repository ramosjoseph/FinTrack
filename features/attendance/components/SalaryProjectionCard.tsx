import type { AttendanceLog } from "../types/attendance";
import type { PayrollSettings } from "@/features/payroll/types/payroll";

interface Props {
  logs: AttendanceLog[];
  payroll: PayrollSettings | null;
}

export default function SalaryProjectionCard({
  logs,
  payroll,
}: Props) {
  if (!payroll) return null;

  const dailyRate =
    payroll.monthly_salary /
    (payroll.work_days_per_week * 4);

  const presentDays = logs.filter(
    (log) => log.status === "present"
  ).length;

  const leaveDays = logs.filter(
    (log) => log.status === "leave"
  ).length;

  const salaryEarned =
    (presentDays + leaveDays) *
    dailyRate;

  const missedSalary =
    logs.filter(
      (log) => log.status === "absent"
    ).length * dailyRate;

  return (
    <div className="rounded-xl border bg-card p-6">
      <h2 className="text-lg font-semibold">
        Salary Projection
      </h2>

      <p className="text-sm text-muted-foreground">
        Based on recorded attendance
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div>
          <p className="text-sm text-muted-foreground">
            Daily Rate
          </p>

          <p className="text-xl font-bold">
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

          <p className="text-xl font-bold">
            {presentDays}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Salary Earned
          </p>

          <p className="text-xl font-bold text-green-600">
            ₱
            {salaryEarned.toLocaleString(
              "en-PH",
              {
                minimumFractionDigits: 2,
              }
            )}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Salary Lost
          </p>

          <p className="text-xl font-bold text-red-600">
            ₱
            {missedSalary.toLocaleString(
              "en-PH",
              {
                minimumFractionDigits: 2,
              }
            )}
          </p>
        </div>
      </div>
    </div>
  );
}