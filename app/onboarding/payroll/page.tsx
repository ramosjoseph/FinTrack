import { redirect } from "next/navigation";

import PayrollForm from "@/features/payroll/components/PayrollForm";
import { DashboardService } from "@/features/dashboard/services/dashboard.service";

export default async function PayrollOnboardingPage() {
  const data = await DashboardService.getDashboardData();

  if (!data) {
    redirect("/login");
  }

  if (data.hasPayroll) {
    redirect("/dashboard");
  }

  return <PayrollForm />;
}