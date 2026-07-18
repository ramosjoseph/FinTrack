import { createClient } from "@/lib/supabase/server";

export class PayrollService {
  static async getPayrollSettings(userId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("payroll_settings")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  static async hasPayrollSettings(userId: string) {
    const supabase = await createClient();

    const { data } = await supabase
      .from("payroll_settings")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle();

    return !!data;
  }

  static async save(
  userId: string,
  data: {
  monthlySalary: number;
  dailyBudget: number;
  parentAllowance: number;
  cutoffDay1: number;
  cutoffDay2: number;
  payday1: number;
  payday2: number;
  workDaysPerWeek: number;
  workHoursPerDay: number;
  employmentType: string;
}
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("payroll_settings")
    .upsert(
      {
        user_id: userId,

        monthly_salary:
          data.monthlySalary,

        daily_budget:
          data.dailyBudget,

        parent_allowance:
          data.parentAllowance,

        cutoff_day_1:
          data.cutoffDay1,

        cutoff_day_2:
          data.cutoffDay2,

        payday_1:
          data.payday1,

        payday_2:
          data.payday2,

        work_days_per_week:
          data.workDaysPerWeek,

        work_hours_per_day:
          data.workHoursPerDay,


        employment_type:
          data.employmentType,
      },
      {
        onConflict: "user_id",
      }
    );

  if (error) {
    throw new Error(error.message);
    }
  }
}