"use client";

import { useMemo, useState } from "react";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

import DeleteExpenseButton from "./DeleteExpenseButton";
import EditExpenseDialog from "./EditExpenseDialog";

import {
  Expense,
  ExpenseCategory,
} from "../types/expense";

interface ExpenseTableProps {
  expenses: Expense[];
  categories: ExpenseCategory[];
}

export default function ExpenseTable({
  expenses,
  categories,
}: ExpenseTableProps) {
  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("all");

  const [sortBy, setSortBy] =
    useState("date-desc");

  const filteredExpenses = useMemo(() => {
    let result = [...expenses];

    if (search.trim()) {
      const keyword =
        search.toLowerCase();

      result = result.filter(
        (expense) =>
          expense.expense_name
            ?.toLowerCase()
            .includes(keyword) ||
          expense.expense_categories?.name
            ?.toLowerCase()
            .includes(keyword) ||
          expense.notes
            ?.toLowerCase()
            .includes(keyword)
      );
    }

    if (
      selectedCategory !== "all"
    ) {
      result = result.filter(
        (expense) =>
          expense.expense_categories
            ?.name === selectedCategory
      );
    }

    switch (sortBy) {
      case "date-asc":
        result.sort(
          (a, b) =>
            new Date(
              a.expense_date
            ).getTime() -
            new Date(
              b.expense_date
            ).getTime()
        );
        break;

      case "amount-desc":
        result.sort(
          (a, b) =>
            Number(b.amount) -
            Number(a.amount)
        );
        break;

      case "amount-asc":
        result.sort(
          (a, b) =>
            Number(a.amount) -
            Number(b.amount)
        );
        break;

      default:
        result.sort(
          (a, b) =>
            new Date(
              b.expense_date
            ).getTime() -
            new Date(
              a.expense_date
            ).getTime()
        );
    }

    return result;
  }, [
    expenses,
    search,
    selectedCategory,
    sortBy,
  ]);

  return (
    <div className="rounded-xl border bg-card shadow-sm">
      <div className="border-b p-6">
        <h2 className="text-xl font-semibold">
          Recent Expenses
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Your latest recorded expenses.
        </p>

        <div className="mt-5 flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search expenses..."
              className="pl-10"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(
                e.target.value
              )
            }
            className="h-10 rounded-md border bg-background px-3"
          >
            <option value="all">
              All Categories
            </option>

            {categories.map(
              (category) => (
                <option
                  key={category.id}
                  value={
                    category.name
                  }
                >
                  {category.name}
                </option>
              )
            )}
          </select>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(
                e.target.value
              )
            }
            className="h-10 rounded-md border bg-background px-3"
          >
            <option value="date-desc">
              Newest First
            </option>

            <option value="date-asc">
              Oldest First
            </option>

            <option value="amount-desc">
              Highest Amount
            </option>

            <option value="amount-asc">
              Lowest Amount
            </option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-muted/40">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Date
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold">
                Expense
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold">
                Category
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold">
                Notes
              </th>

              <th className="px-6 py-3 text-right text-sm font-semibold">
                Amount
              </th>

              <th className="px-6 py-3 text-center text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredExpenses.length ===
            0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center text-muted-foreground"
                >
                  No matching expenses
                  found.
                </td>
              </tr>
            ) : (
              filteredExpenses.map(
                (expense) => (
                  <tr
                    key={
                      expense.id
                    }
                    className="border-b transition-colors hover:bg-muted/30"
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      {new Date(
                        expense.expense_date
                      ).toLocaleDateString(
                        "en-PH",
                        {
                          year:
                            "numeric",
                          month:
                            "short",
                          day: "numeric",
                        }
                      )}
                    </td>

                    <td className="px-6 py-4 font-medium">
                      {
                        expense.expense_name
                      }
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {expense
                          .expense_categories
                          ?.name ??
                          "Uncategorized"}
                      </span>
                    </td>

                    <td className="max-w-sm px-6 py-4 text-sm text-muted-foreground">
                      {expense.notes ||
                        "—"}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-right font-semibold">
                      ₱
                      {Number(
                        expense.amount
                      ).toLocaleString(
                        "en-PH",
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <EditExpenseDialog
                          expense={
                            expense
                          }
                          categories={
                            categories
                          }
                        />

                        <DeleteExpenseButton
                          expenseId={
                            expense.id
                          }
                        />
                      </div>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}