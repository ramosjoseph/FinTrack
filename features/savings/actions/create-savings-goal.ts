"use server";

import { savingsSchema } from "../validation/savings-schema";
import { SavingsService } from "../services/savings.service";

export async function createSavingsGoalAction(
  formData: FormData
) {
  const validated = savingsSchema.safeParse({
    goalName: formData.get("goalName"),

    targetAmount:
      formData.get("targetAmount"),

    currentAmount:
      formData.get("currentAmount") || 0,

    monthlyContribution:
      formData.get("monthlyContribution") || 0,

    deadline: formData.get("deadline"),
  });

  if (!validated.success) {
    return {
      success: false,
      error:
        validated.error.issues[0]?.message ??
        "Invalid data.",
    };
  }

  try {
    await SavingsService.createGoal(
      validated.data
    );

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