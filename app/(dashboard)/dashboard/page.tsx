import DashboardStats from "@/features/dashboard/components/DashboardStats";
import FinancialHealthScore from "@/features/dashboard/components/FinancialHealthScore";
import SmartInsights from "@/features/dashboard/components/SmartInsights";
import BudgetOverview from "@/features/dashboard/components/BudgetOverview";
import ExpenseCategoryChart from "@/features/dashboard/components/ExpenseCategoryChart";

import MonthlyExpenseChart from "@/features/expenses/components/MonthlyExpenseChart";
import DailyExpenseChart from "@/features/expenses/components/DailyExpenseChart";

import RecentActivity from "@/features/dashboard/components/RecentActivity";

import { ExpenseService } from "@/features/expenses/services/expense.service";
import { PayrollService } from "@/features/payroll/services/payroll.service";
import { SavingsService } from "@/features/savings/services/savings.service";

import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [expenses, payroll, goals] =
    await Promise.all([
      ExpenseService.getExpenses(),

      user
        ? PayrollService.getPayrollSettings(
            user.id
          )
        : null,

      SavingsService.getGoals(),
    ]);

  return (
    <div className="space-y-8">
      <DashboardStats
        expenses={expenses}
        payroll={payroll}
        goals={goals}
      />

      <FinancialHealthScore
        expenses={expenses}
        payroll={payroll}
      />

      <SmartInsights
        expenses={expenses}
        payroll={payroll}
        goals={goals}
      />

      <BudgetOverview
        expenses={expenses}
        payroll={payroll}
      />

      <ExpenseCategoryChart
        expenses={expenses}
      />

      <MonthlyExpenseChart
        expenses={expenses}
      />

      <DailyExpenseChart
        expenses={expenses}
      />

      <RecentActivity
        expenses={expenses}
      />
    </div>
  );
}