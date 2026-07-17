"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

import { PayrollService } from "@/features/payroll/services/payroll.service";

import { settingsSchema } from "../validation/settings-schema";

export async function saveSettingsAction(
  formData: FormData
) {
  try {
    const parsed =
      settingsSchema.safeParse({
        monthlySalary:
          formData.get(
            "monthlySalary"
          ),

        dailyBudget:
          formData.get(
            "dailyBudget"
          ),

        parentAllowance:
          formData.get(
            "parentAllowance"
          ),

        cutoffDay1:
          formData.get(
            "cutoffDay1"
          ),

        cutoffDay2:
          formData.get(
            "cutoffDay2"
          ),

        payday1:
          formData.get("payday1"),

        payday2:
          formData.get("payday2"),

        workDaysPerWeek:
          formData.get(
            "workDaysPerWeek"
          ),

        workHoursPerDay:
          formData.get(
            "workHoursPerDay"
          ),

        monthlyWorkingDays:
          formData.get(
            "monthlyWorkingDays"
          ),

        employmentType:
          formData.get(
            "employmentType"
          ),
      });

    if (!parsed.success) {
      return {
        success: false,
        error:
          parsed.error.issues[0]
            ?.message,
      };
    }

    const supabase =
      await createClient();

    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    await PayrollService.save(
      user.id,
      parsed.data
    );

    revalidatePath(
      "/settings"
    );

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error:
        "Failed to save settings.",
    };
  }
}