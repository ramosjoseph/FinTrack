"use server";

import { payrollSchema } from "../validation/payroll-schema";
import { PayrollService } from "../services/payroll.service";
import { createClient } from "@/lib/supabase/server";

export async function savePayrollAction(formData: FormData) {
  const validated = payrollSchema.safeParse({
    monthlySalary: formData.get("monthlySalary"),
    dailyBudget: formData.get("dailyBudget"),
    parentAllowance: formData.get("parentAllowance"),
    cutoffDay1: formData.get("cutoffDay1"),
    cutoffDay2: formData.get("cutoffDay2"),
    payday1: formData.get("payday1"),
    payday2: formData.get("payday2"),
    workDaysPerWeek: formData.get("workDaysPerWeek"),
    workHoursPerDay: formData.get("workHoursPerDay"),
    employmentType: formData.get("employmentType"),
  });

  if (!validated.success) {
    return {
      success: false,
      error: validated.error.issues[0]?.message ?? "Invalid form data.",
    };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("USER:", user);

  if (!user) {
    return {
      success: false,
      error: "You must be logged in.",
    };
  }

  try {
    await PayrollService.save(user.id, validated.data);

    return {
      success: true,
      message: "Payroll settings saved successfully.",
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