"use server";

import { revalidatePath } from "next/cache";

import { AttendanceService } from "../services/attendance.service";

export async function deleteAttendanceAction(
  logId: string
) {
  try {
    await AttendanceService.deleteLog(
      logId
    );

    revalidatePath(
      "/attendance"
    );

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error:
        "Failed to delete attendance record.",
    };
  }
}