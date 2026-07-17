"use server";

import { revalidatePath } from "next/cache";

import { expenseSchema } from "../validation/expense-schema";
import { ExpenseService } from "../services/expense.service";

export async function updateExpenseAction(
  expenseId: string,
  formData: FormData
) {
  try {
    const parsed = expenseSchema.safeParse({
      expenseName: formData.get("expenseName"),
      categoryId: formData.get("categoryId"),
      amount: formData.get("amount"),
      expenseDate: formData.get("expenseDate"),
      notes: formData.get("notes"),
    });

    if (!parsed.success) {
      return {
        success: false,
        error:
          parsed.error.issues[0]?.message ??
          "Invalid input.",
      };
    }

    await ExpenseService.updateExpense(
      expenseId,
      parsed.data
    );

    revalidatePath("/expenses");

    return {
      success: true,
      message: "Expense updated successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: "Unable to update expense.",
    };
  }
}