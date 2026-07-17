import { createClient } from "@/lib/supabase/server";

import type { SavingsGoal } from "../types/savings";
import type { SavingsFormValues } from "../validation/savings-schema";

export class SavingsService {
  static async getGoals(): Promise<SavingsGoal[]> {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Unauthorized.");
    }

    const { data, error } = await supabase
      .from("savings_goals")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw error;
    }

    return (data ?? []) as SavingsGoal[];
  }

  static async createGoal(
    values: SavingsFormValues
  ) {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Unauthorized.");
    }

    const { error } = await supabase
      .from("savings_goals")
      .insert({
        user_id: user.id,

        goal_name: values.goalName,

        target_amount:
          values.targetAmount,

        current_amount:
          values.currentAmount,

        monthly_contribution:
          values.monthlyContribution,

        deadline:
          values.deadline || null,

        completed: false,
      });

    if (error) {
      throw error;
    }
  }

  static async updateGoal(
    id: string,
    values: SavingsFormValues
  ) {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Unauthorized.");
    }

    const { error } = await supabase
      .from("savings_goals")
      .update({
        goal_name: values.goalName,

        target_amount:
          values.targetAmount,

        current_amount:
          values.currentAmount,

        monthly_contribution:
          values.monthlyContribution,

        deadline:
          values.deadline || null,

        updated_at:
          new Date().toISOString(),
      })
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      throw error;
    }
  }

  static async deleteGoal(id: string) {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Unauthorized.");
    }

    const { error } = await supabase
      .from("savings_goals")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      throw error;
    }
  }
}