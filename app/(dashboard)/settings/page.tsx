import PayrollSettingsForm from "@/features/settings/components/PayrollSettingsForm";

import { PayrollService } from "@/features/payroll/services/payroll.service";

import { createClient } from "@/lib/supabase/server";

export default async function SettingsPage() {
  const supabase =
    await createClient();

  const {
    data: { user },
  } =
    await supabase.auth.getUser();

  const payroll =
    user
      ? await PayrollService.getPayrollSettings(
          user.id
        )
      : null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="text-muted-foreground">
          Manage payroll,
          budgeting, and
          financial preferences.
        </p>
      </div>

      <PayrollSettingsForm
        payroll={payroll}
      />
    </div>
  );
}