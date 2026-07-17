"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { payrollSchema } from "../validation/payroll-schema";
import type { PayrollFormValues } from "../validation/payroll-schema";

import { savePayrollAction } from "../actions/save-payroll";

import PayrollCard from "./PayrollCard";
import PayrollSection from "./PayrollSection";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

import type { PayrollSettings } from "../types/payroll";

interface PayrollFormProps {
  onSuccess?: () => void;
  initialData?: PayrollSettings | null;
}

export default function PayrollForm({
  onSuccess,
  initialData,
}: PayrollFormProps) {
  const router = useRouter();

  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");

  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PayrollFormValues>({
    resolver: zodResolver(payrollSchema),

    defaultValues: {
  monthlySalary:
    initialData?.monthly_salary ?? 30000,

  dailyBudget:
    initialData?.daily_budget ?? 350,

  parentAllowance:
    initialData?.parent_allowance ?? 0,

  cutoffDay1:
    initialData?.cutoff_day_1 ?? 18,

  cutoffDay2:
    initialData?.cutoff_day_2 ?? 3,

  payday1:
    initialData?.payday_1 ?? 15,

  payday2:
    initialData?.payday_2 ?? 30,

  workDaysPerWeek:
    initialData?.work_days_per_week ?? 5,

  workHoursPerDay:
    initialData?.work_hours_per_day ?? 8,

  employmentType:
    (initialData?.employment_type as
      | "Regular"
      | "Probationary"
      | "Contractual"
      | "Part-time"
      | "Freelance") ?? "Regular",
  },
});

  async function onSubmit(values: PayrollFormValues) {
    setServerError("");
    setServerSuccess("");

    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    startTransition(async () => {
      const result = await savePayrollAction(formData);

      if (!result.success) {
        setServerError(result.error ?? "Unknown error.");
        return;
      }

      setServerSuccess(result.message ?? "");

router.refresh();

onSuccess?.();
    });
  }

  return (
    <PayrollCard
      title="Payroll Settings"
      description="Configure your salary, budget, and payroll schedule."
    >
      <form
  onSubmit={handleSubmit(onSubmit)}
  className="space-y-8"
>
              <PayrollSection
          title="Salary Information"
          description="Enter your income and daily financial targets."
        >
          <div className="grid gap-6 md:grid-cols-2">

            <div className="space-y-2">
              <Label htmlFor="monthlySalary">
                Monthly Salary
              </Label>

              <Input
                id="monthlySalary"
                type="number"
                step="0.01"
                {...register("monthlySalary")}
              />

              {errors.monthlySalary && (
                <p className="text-sm text-destructive">
                  {errors.monthlySalary.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dailyBudget">
                Daily Budget
              </Label>

              <Input
                id="dailyBudget"
                type="number"
                step="0.01"
                {...register("dailyBudget")}
              />

              {errors.dailyBudget && (
                <p className="text-sm text-destructive">
                  {errors.dailyBudget.message}
                </p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="parentAllowance">
                Parent Allowance (Optional)
              </Label>

              <Input
                id="parentAllowance"
                type="number"
                step="0.01"
                {...register("parentAllowance")}
              />

              {errors.parentAllowance && (
                <p className="text-sm text-destructive">
                  {errors.parentAllowance.message}
                </p>
              )}
            </div>

          </div>
        </PayrollSection>
                <PayrollSection
          title="Payroll Schedule"
          description="Configure your payroll cutoff and payday schedule."
        >
          <div className="grid gap-6 md:grid-cols-2">

            <div className="space-y-2">
              <Label htmlFor="cutoffDay1">
                Cutoff Day 1
              </Label>

              <Input
                id="cutoffDay1"
                type="number"
                {...register("cutoffDay1")}
              />

              {errors.cutoffDay1 && (
                <p className="text-sm text-destructive">
                  {errors.cutoffDay1.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cutoffDay2">
                Cutoff Day 2
              </Label>

              <Input
                id="cutoffDay2"
                type="number"
                {...register("cutoffDay2")}
              />

              {errors.cutoffDay2 && (
                <p className="text-sm text-destructive">
                  {errors.cutoffDay2.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="payday1">
                Payday 1
              </Label>

              <Input
                id="payday1"
                type="number"
                {...register("payday1")}
              />

              {errors.payday1 && (
                <p className="text-sm text-destructive">
                  {errors.payday1.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="payday2">
                Payday 2
              </Label>

              <Input
                id="payday2"
                type="number"
                {...register("payday2")}
              />

              {errors.payday2 && (
                <p className="text-sm text-destructive">
                  {errors.payday2.message}
                </p>
              )}
            </div>

          </div>
        </PayrollSection>

        <PayrollSection
          title="Employment Details"
          description="Tell us about your working schedule."
        >
          <div className="grid gap-6 md:grid-cols-2">

            <div className="space-y-2">
              <Label htmlFor="workDaysPerWeek">
                Work Days Per Week
              </Label>

              <Input
                id="workDaysPerWeek"
                type="number"
                {...register("workDaysPerWeek")}
              />

              {errors.workDaysPerWeek && (
                <p className="text-sm text-destructive">
                  {errors.workDaysPerWeek.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="workHoursPerDay">
                Work Hours Per Day
              </Label>

              <Input
                id="workHoursPerDay"
                type="number"
                step="0.5"
                {...register("workHoursPerDay")}
              />

              {errors.workHoursPerDay && (
                <p className="text-sm text-destructive">
                  {errors.workHoursPerDay.message}
                </p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="employmentType">
                Employment Type
              </Label>

              <select
                id="employmentType"
                {...register("employmentType")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="Regular">Regular</option>
                <option value="Probationary">Probationary</option>
                <option value="Contractual">Contractual</option>
                <option value="Part-time">Part-time</option>
                <option value="Freelance">Freelance</option>
              </select>

              {errors.employmentType && (
                <p className="text-sm text-destructive">
                  {errors.employmentType.message}
                </p>
              )}
            </div>

          </div>
        </PayrollSection>
                {serverError && (
          <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3">
            <p className="text-sm text-destructive">
              {serverError}
            </p>
          </div>
        )}

        {serverSuccess && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-800 dark:bg-emerald-950/30">
            <p className="text-sm text-emerald-700 dark:text-emerald-400">
              {serverSuccess}
            </p>
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Spinner className="mr-2 h-4 w-4" />
              Saving Payroll Settings...
            </>
          ) : (
            "Save Payroll Settings"
          )}
        </Button>
      </form>
    </PayrollCard>
  );
}