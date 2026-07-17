import { createClient } from "@/lib/supabase/server";

import type { ExpenseFormValues } from "../validation/expense-schema";
import type {
  Expense,
  ExpenseCategory,
} from "../types/expense";

export class ExpenseService {
  static async createExpense(
    values: ExpenseFormValues
  ): Promise<Expense> {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Unauthorized.");
    }

    const { data, error } = await supabase
      .from("expenses")
      .insert({
        user_id: user.id,
        category_id: values.categoryId,
        expense_name: values.expenseName,
        amount: values.amount,
        expense_date: values.expenseDate,
        notes: values.notes || null,
      })
      .select(`
        *,
        expense_categories (
          id,
          name,
          icon,
          color
        )
      `)
      .single();

    if (error) {
      throw error;
    }

    return data as Expense;
  }

  static async updateExpense(
    expenseId: string,
    values: ExpenseFormValues
  ): Promise<Expense> {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Unauthorized.");
    }

    const { data, error } = await supabase
      .from("expenses")
      .update({
        category_id: values.categoryId,
        expense_name: values.expenseName,
        amount: values.amount,
        expense_date: values.expenseDate,
        notes: values.notes || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", expenseId)
      .eq("user_id", user.id)
      .select(`
        *,
        expense_categories (
          id,
          name,
          icon,
          color
        )
      `)
      .single();

    if (error) {
      throw error;
    }

    return data as Expense;
  }

  static async deleteExpense(
    expenseId: string
  ): Promise<void> {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Unauthorized.");
    }

    const { error } = await supabase
      .from("expenses")
      .delete()
      .eq("id", expenseId)
      .eq("user_id", user.id);

    if (error) {
      throw error;
    }
  }

  static async getExpenses(): Promise<Expense[]> {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Unauthorized.");
    }

    const { data, error } = await supabase
      .from("expenses")
      .select(`
        *,
        expense_categories (
          id,
          name,
          icon,
          color
        )
      `)
      .eq("user_id", user.id)
      .order("expense_date", { ascending: false });

    if (error) {
      throw error;
    }

    return (data ?? []) as Expense[];
  }

  static async getCategories(): Promise<ExpenseCategory[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("expense_categories")
      .select("*")
      .order("name");

    if (error) {
      throw error;
    }

    return (data ?? []) as ExpenseCategory[];
  }
}