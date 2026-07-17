"use server";

import { SavingsService } from "../services/savings.service";

export async function deleteSavingsGoalAction(
  goalId: string
) {
  try {
    await SavingsService.deleteGoal(goalId);

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Something went wrong.",
    };
  }
}