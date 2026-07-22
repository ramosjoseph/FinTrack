"use server";

import { revalidatePath } from "next/cache";

import { expenseSchema } from "../validation/expense-schema";
import { ExpenseService } from "../services/expense.service";

export async function saveExpenseAction(formData: FormData) {
  try {
    const parsed = expenseSchema.safeParse({
      expenseName: formData.get("expenseName"),
      categoryId: formData.get("categoryId"),
      amount: formData.get("amount"),
      expenseDate: formData.get("expenseDate"),
      notes: formData.get("notes"),
    });

    if (!parsed.success) {
  console.error(
    "EXPENSE VALIDATION:",
    JSON.stringify(parsed.error.flatten(), null, 2)
  );

  return {
    success: false,
    error: JSON.stringify(parsed.error.flatten()),
  };
}

    await ExpenseService.createExpense(parsed.data);

    revalidatePath("/expenses");

    return {
      success: true,
      message: "Expense added successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: "Something went wrong while saving the expense.",
    };
  }
}