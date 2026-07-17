import ExpenseForm from "@/features/expenses/components/ExpenseForm";
import ExpenseSummary from "@/features/expenses/components/ExpenseSummary";
import MonthlyExpenseChart from "@/features/expenses/components/MonthlyExpenseChart";
import ExpenseTable from "@/features/expenses/components/ExpenseTable";
import ExportExpensesButton from "@/features/expenses/components/ExportExpensesButton";

import { ExpenseService } from "@/features/expenses/services/expense.service";

export default async function ExpensesPage() {
  const [categories, expenses] = await Promise.all([
    ExpenseService.getCategories(),
    ExpenseService.getExpenses(),
  ]);

  return (
    <div className="space-y-8">
      <ExpenseForm categories={categories} />

      <ExpenseSummary expenses={expenses} />

      <MonthlyExpenseChart expenses={expenses} />

      <div className="flex justify-end">
        <ExportExpensesButton
          expenses={expenses}
        />
      </div>

      <ExpenseTable
        expenses={expenses}
        categories={categories}
      />
    </div>
  );
}