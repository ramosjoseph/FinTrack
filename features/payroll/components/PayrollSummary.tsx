import type { PayrollSettings } from "../types/payroll";

interface PayrollSummaryProps {
  payroll: PayrollSettings | null;
}

export default function PayrollSummary({
  payroll,
}: PayrollSummaryProps) {
  if (!payroll) {
    return (
      <div className="rounded-xl border bg-card p-6">
        <p className="text-muted-foreground">
          No payroll settings found.
        </p>
      </div>
    );
  }

  const estimatedDailySalary =
    payroll.monthly_salary /
    (payroll.work_days_per_week * 4);

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Monthly Salary
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          ₱
          {Number(
            payroll.monthly_salary
          ).toLocaleString("en-PH", {
            minimumFractionDigits: 2,
          })}
        </h2>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Daily Budget
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          ₱
          {Number(
            payroll.daily_budget
          ).toLocaleString("en-PH", {
            minimumFractionDigits: 2,
          })}
        </h2>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Parent Allowance
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          ₱
          {Number(
            payroll.parent_allowance
          ).toLocaleString("en-PH", {
            minimumFractionDigits: 2,
          })}
        </h2>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Estimated Daily Salary
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          ₱
          {estimatedDailySalary.toLocaleString(
            "en-PH",
            {
              minimumFractionDigits: 2,
            }
          )}
        </h2>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Employment Type
        </p>

        <h2 className="mt-2 text-2xl font-bold">
          {payroll.employment_type}
        </h2>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Payroll Cutoff
        </p>

        <h2 className="mt-2 text-2xl font-bold">
          {payroll.cutoff_day_1} / {payroll.cutoff_day_2}
        </h2>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Payday Schedule
        </p>

        <h2 className="mt-2 text-2xl font-bold">
          {payroll.payday_1} / {payroll.payday_2}
        </h2>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Work Schedule
        </p>

        <h2 className="mt-2 text-xl font-bold">
          {payroll.work_days_per_week} Days / Week
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          {payroll.work_hours_per_day} Hours / Day
        </p>
      </div>
    </div>
  );
}