import { createClient } from "@/lib/supabase/server";

import PayrollSummary from "@/features/payroll/components/PayrollSummary";
import EditPayrollDialog from "@/features/payroll/components/EditPayrollDialog";

import { PayrollService } from "@/features/payroll/services/payroll.service";

export default async function PayrollPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const payroll = user
    ? await PayrollService.getPayrollSettings(
        user.id
      )
    : null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Payroll
          </h1>

          <p className="text-muted-foreground">
            Manage your salary and payroll settings.
          </p>
        </div>

        <EditPayrollDialog payroll={payroll} />
      </div>

      <PayrollSummary payroll={payroll} />
    </div>
  );
}