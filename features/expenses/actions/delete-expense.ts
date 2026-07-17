"use server";

import { revalidatePath } from "next/cache";
import { ExpenseService } from "../services/expense.service";

export async function deleteExpenseAction(id: string) {
  try {
    await ExpenseService.deleteExpense(id);

    revalidatePath("/expenses");

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: "Unable to delete expense.",
    };
  }
}