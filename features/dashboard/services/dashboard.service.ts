import { createClient } from "@/lib/supabase/server";

export class DashboardService {
  static async getDashboardData() {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    const { data: payroll } = await supabase
      .from("payroll_settings")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    return {
      user,
      profile,
      hasPayroll: !!payroll,
    };
  }
}