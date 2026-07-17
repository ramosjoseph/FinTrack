"use client";

import {
  useState,
  useTransition,
} from "react";

import { useRouter } from "next/navigation";

import { createAttendanceAction } from "../actions/create-attendance";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AttendanceForm() {
  const router = useRouter();

  const [error, setError] =
    useState("");

  const [
    isPending,
    startTransition,
  ] = useTransition();

  async function submit(
    formData: FormData
  ) {
    setError("");

    startTransition(async () => {
      const result =
        await createAttendanceAction(
          formData
        );

      if (!result.success) {
        setError(
          result.error ??
            "Something went wrong."
        );

        return;
      }

      router.refresh();
    });
  }

  return (
    <form
      action={submit}
      className="space-y-6 rounded-xl border bg-card p-6"
    >
      <div>
        <h2 className="text-xl font-semibold">
          Add Attendance
        </h2>

        <p className="text-sm text-muted-foreground">
          Record your daily work attendance.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="workDate">
          Work Date
        </Label>

        <Input
          id="workDate"
          name="workDate"
          type="date"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">
          Status
        </Label>

        <select
          id="status"
          name="status"
          className="w-full rounded-md border bg-background px-3 py-2"
          defaultValue="present"
        >
          <option value="present">
            Present
          </option>

          <option value="absent">
            Absent
          </option>

          <option value="leave">
            Leave
          </option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="hoursWorked">
          Hours Worked
        </Label>

        <Input
          id="hoursWorked"
          name="hoursWorked"
          type="number"
          defaultValue={8}
          min={0}
          step="0.5"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="overtimeHours">
          Overtime Hours
        </Label>

        <Input
          id="overtimeHours"
          name="overtimeHours"
          type="number"
          defaultValue={0}
          min={0}
          step="0.5"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="remarks">
          Remarks
        </Label>

        <Input
          id="remarks"
          name="remarks"
          placeholder="Optional"
        />
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3">
          <p className="text-sm text-destructive">
            {error}
          </p>
        </div>
      )}

      <Button
        type="submit"
        disabled={isPending}
      >
        {isPending
          ? "Saving..."
          : "Add Attendance"}
      </Button>
    </form>
  );
}