"use client";

import {
  useState,
  useTransition,
} from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { PayrollSettings } from "@/features/payroll/types/payroll";

import { saveSettingsAction } from "../actions/save-settings";

interface Props {
  payroll: PayrollSettings | null;
}

export default function PayrollSettingsForm({
  payroll,
}: Props) {
  const [
    isPending,
    startTransition,
  ] = useTransition();

  const [message, setMessage] =
    useState("");

  const [salary, setSalary] =
    useState(
      payroll?.monthly_salary ?? 0
    );

  const [workDays, setWorkDays] =
    useState(
      payroll?.monthly_working_days ??
        22
    );

  const [workHours, setWorkHours] =
    useState(
      payroll?.work_hours_per_day ??
        8
    );

  const dailyRate =
    salary > 0
      ? salary / workDays
      : 0;

  const hourlyRate =
    workHours > 0
      ? dailyRate / workHours
      : 0;

  function submit(
    formData: FormData
  ) {
    setMessage("");

    startTransition(
      async () => {
        const result =
          await saveSettingsAction(
            formData
          );

        if (!result.success) {
          setMessage(
            result.error ??
              "Failed to save settings."
          );

          return;
        }

        setMessage(
          "Settings saved successfully."
        );
      }
    );
  }

  return (
    <form
      action={submit}
      className="space-y-8"
    >
      <div className="rounded-xl border bg-card p-6">
        <h2 className="mb-6 text-xl font-semibold">
          Income Settings
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>
              Monthly Salary
            </Label>

            <Input
              name="monthlySalary"
              type="number"
              min="0"
              defaultValue={
                payroll?.monthly_salary ??
                0
              }
              onChange={(e) =>
                setSalary(
                  Number(
                    e.target.value
                  )
                )
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label>
              Parent Allowance
            </Label>

            <Input
              name="parentAllowance"
              type="number"
              min="0"
              defaultValue={
                payroll?.parent_allowance ??
                0
              }
            />
          </div>

          <div className="space-y-2">
            <Label>
              Employment Type
            </Label>

            <select
              name="employmentType"
              className="w-full rounded-md border px-3 py-2"
              defaultValue={
                payroll?.employment_type ??
                "monthly"
              }
            >
              <option value="monthly">
                Monthly
              </option>

              <option value="daily">
                Daily
              </option>

              <option value="hourly">
                Hourly
              </option>

              <option value="contract">
                Contract
              </option>
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <h2 className="mb-6 text-xl font-semibold">
          Budget Settings
        </h2>

        <div className="space-y-2">
          <Label>
            Daily Budget
          </Label>

          <Input
            name="dailyBudget"
            type="number"
            min="0"
            defaultValue={
              payroll?.daily_budget ??
              0
            }
          />
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <h2 className="mb-6 text-xl font-semibold">
          Work Schedule
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label>
              Work Days Per Week
            </Label>

            <Input
              name="workDaysPerWeek"
              type="number"
              min="1"
              max="7"
              defaultValue={
                payroll?.work_days_per_week ??
                5
              }
            />
          </div>

          <div className="space-y-2">
            <Label>
              Work Hours Per Day
            </Label>

            <Input
              name="workHoursPerDay"
              type="number"
              min="1"
              max="24"
              defaultValue={
                payroll?.work_hours_per_day ??
                8
              }
              onChange={(e) =>
                setWorkHours(
                  Number(
                    e.target.value
                  )
                )
              }
            />
          </div>

          <div className="space-y-2">
            <Label>
              Monthly Working Days
            </Label>

            <Input
              name="monthlyWorkingDays"
              type="number"
              min="1"
              max="31"
              defaultValue={
                payroll?.monthly_working_days ??
                22
              }
              onChange={(e) =>
                setWorkDays(
                  Number(
                    e.target.value
                  )
                )
              }
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <h2 className="mb-6 text-xl font-semibold">
          Payroll Schedule
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Input
            name="cutoffDay1"
            type="number"
            placeholder="Cutoff Day 1"
            defaultValue={
              payroll?.cutoff_day_1 ??
              15
            }
          />

          <Input
            name="cutoffDay2"
            type="number"
            placeholder="Cutoff Day 2"
            defaultValue={
              payroll?.cutoff_day_2 ??
              30
            }
          />

          <Input
            name="payday1"
            type="number"
            placeholder="Payday 1"
            defaultValue={
              payroll?.payday_1 ?? 15
            }
          />

          <Input
            name="payday2"
            type="number"
            placeholder="Payday 2"
            defaultValue={
              payroll?.payday_2 ?? 30
            }
          />
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Salary Preview
        </h2>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span>
              Estimated Daily Rate
            </span>

            <span className="font-semibold">
              ₱
              {dailyRate.toLocaleString(
                "en-PH",
                {
                  minimumFractionDigits: 2,
                }
              )}
            </span>
          </div>

          <div className="flex justify-between">
            <span>
              Estimated Hourly Rate
            </span>

            <span className="font-semibold text-green-600">
              ₱
              {hourlyRate.toLocaleString(
                "en-PH",
                {
                  minimumFractionDigits: 2,
                }
              )}
            </span>
          </div>
        </div>
      </div>

      {message && (
        <p className="text-sm">
          {message}
        </p>
      )}

      <Button
        type="submit"
        disabled={isPending}
      >
        {isPending
          ? "Saving..."
          : "Save Settings"}
      </Button>
    </form>
  );
}