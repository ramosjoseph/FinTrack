"use client";

import * as XLSX from "xlsx";

import { Button } from "@/components/ui/button";

import type { Expense } from "../types/expense";

interface Props {
  expenses: Expense[];
}

export default function ExportExpensesButton({
  expenses,
}: Props) {
  function exportToExcel() {
    const rows = expenses.map(
      (expense) => ({
        Date: new Date(
          expense.expense_date
        ).toLocaleDateString("en-PH"),

        Expense:
          expense.expense_name,

        Category:
          expense.expense_categories
            ?.name ??
          "Uncategorized",

        Notes:
          expense.notes ?? "",

        Amount:
          expense.amount,
      })
    );

    const worksheet =
      XLSX.utils.json_to_sheet(
        rows
      );

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Expenses"
    );

    XLSX.writeFile(
      workbook,
      `expenses-${new Date()
        .toISOString()
        .split("T")[0]}.xlsx`
    );
  }

  return (
    <Button
      variant="outline"
      onClick={exportToExcel}
    >
      Export Excel
    </Button>
  );
}