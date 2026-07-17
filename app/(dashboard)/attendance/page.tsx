import AttendanceForm from "@/features/attendance/components/AttendanceForm";
import AttendanceSummary from "@/features/attendance/components/AttendanceSummary";
import AttendanceTable from "@/features/attendance/components/AttendanceTable";
import CutoffSalaryCard from "@/features/attendance/components/CutoffSalaryCard";
import NextPaydayCard from "@/features/attendance/components/NextPaydayCard";

import { AttendanceService } from "@/features/attendance/services/attendance.service";
import { PayrollService } from "@/features/payroll/services/payroll.service";

import { createClient } from "@/lib/supabase/server";

export default async function AttendancePage() {
  const supabase =
    await createClient();

  const {
    data: { user },
  } =
    await supabase.auth.getUser();

  const [logs, payroll] =
    await Promise.all([
      AttendanceService.getLogs(),

      user
        ? PayrollService.getPayrollSettings(
            user.id
          )
        : null,
    ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Attendance
        </h1>

        <p className="text-muted-foreground">
          Track attendance and estimate
          salary.
        </p>
      </div>

      <AttendanceSummary
        logs={logs}
        payroll={payroll}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <CutoffSalaryCard
          logs={logs}
          payroll={payroll}
        />

        <NextPaydayCard
          logs={logs}
          payroll={payroll}
        />
      </div>

      <AttendanceForm />

      <AttendanceTable
        logs={logs}
      />
    </div>
  );
}