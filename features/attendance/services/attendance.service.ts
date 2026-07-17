import { createClient } from "@/lib/supabase/server";

import type { AttendanceLog } from "../types/attendance";

export class AttendanceService {
  static async getLogs(): Promise<
    AttendanceLog[]
  > {
    const supabase =
      await createClient();

    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (!user) {
      throw new Error(
        "Unauthorized."
      );
    }

    const { data, error } =
      await supabase
        .from("attendance_logs")
        .select("*")
        .eq("user_id", user.id)
        .order("work_date", {
          ascending: false,
        });

    if (error) {
      throw error;
    }

    return (
      data ?? []
    ) as AttendanceLog[];
  }

  static async createLog(values: {
    workDate: string;
    status: string;
    hoursWorked: number;
    overtimeHours: number;
    remarks?: string;
  }) {
    const supabase =
      await createClient();

    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (!user) {
      throw new Error(
        "Unauthorized."
      );
    }

    const { error } =
      await supabase
        .from("attendance_logs")
        .insert({
          user_id: user.id,

          work_date:
            values.workDate,

          status: values.status,

          hours_worked:
            values.hoursWorked,

          overtime_hours:
            values.overtimeHours,

          remarks:
            values.remarks || null,
        });

    if (error) {
      throw error;
    }
  }

  static async deleteLog(
    logId: string
  ) {
    const supabase =
      await createClient();

    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (!user) {
      throw new Error(
        "Unauthorized."
      );
    }

    const { error } =
      await supabase
        .from("attendance_logs")
        .delete()
        .eq("id", logId)
        .eq("user_id", user.id);

    if (error) {
      throw error;
    }
  }

  static async updateLog(
    logId: string,
    values: {
      workDate: string;
      status: string;
      hoursWorked: number;
      overtimeHours: number;
      remarks?: string;
    }
  ) {
    const supabase =
      await createClient();

    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (!user) {
      throw new Error(
        "Unauthorized."
      );
    }

    const { error } =
      await supabase
        .from("attendance_logs")
        .update({
          work_date:
            values.workDate,

          status:
            values.status,

          hours_worked:
            values.hoursWorked,

          overtime_hours:
            values.overtimeHours,

          remarks:
            values.remarks ??
            null,

          updated_at:
            new Date().toISOString(),
        })
        .eq("id", logId)
        .eq("user_id", user.id);

    if (error) {
      throw error;
    }
  }
}