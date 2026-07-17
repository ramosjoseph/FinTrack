import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import AppShell from "@/components/layout/AppShell";
import Header from "@/components/layout/Header";

import { DashboardService } from "@/features/dashboard/services/dashboard.service";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const data = await DashboardService.getDashboardData();

  if (!data) {
    redirect("/login");
  }

  if (!data.hasPayroll) {
    redirect("/onboarding/payroll");
  }

  return (
    <AppShell
      header={
        <Header
          fullName={data.profile?.full_name}
        />
      }
    >
      {children}
    </AppShell>
  );
}