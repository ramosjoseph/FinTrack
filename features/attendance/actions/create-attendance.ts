"use server";

import { revalidatePath } from "next/cache";

import { AttendanceService } from "../services/attendance.service";

export async function createAttendanceAction(
  formData: FormData
) {
  try {
    await AttendanceService.createLog({
      workDate:
        String(
          formData.get("workDate")
        ),

      status:
        String(
          formData.get("status")
        ),

      hoursWorked: Number(
        formData.get(
          "hoursWorked"
        ) || 8
      ),

      overtimeHours: Number(
        formData.get(
          "overtimeHours"
        ) || 0
      ),

      remarks: String(
        formData.get("remarks") ||
          ""
      ),
    });

    revalidatePath(
      "/attendance"
    );

    return {
      success: true,
    };
  } catch (error) {
  console.error("ATTENDANCE ERROR:", error);

  return {
    success: false,
    error:
      error instanceof Error
        ? error.message
        : JSON.stringify(error),
  };
}
}