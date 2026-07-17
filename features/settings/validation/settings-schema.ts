import { z } from "zod";

export const settingsSchema =
  z.object({
    monthlySalary: z.coerce
      .number()
      .min(0),

    dailyBudget: z.coerce
      .number()
      .min(0),

    parentAllowance: z.coerce
      .number()
      .min(0),

    cutoffDay1: z.coerce
      .number()
      .min(1)
      .max(31),

    cutoffDay2: z.coerce
      .number()
      .min(1)
      .max(31),

    payday1: z.coerce
      .number()
      .min(1)
      .max(31),

    payday2: z.coerce
      .number()
      .min(1)
      .max(31),

    workDaysPerWeek:
      z.coerce
        .number()
        .min(1)
        .max(7),

    workHoursPerDay:
      z.coerce
        .number()
        .min(1)
        .max(24),

    monthlyWorkingDays:
      z.coerce
        .number()
        .min(1)
        .max(31),

    employmentType: z
      .string()
      .min(1),
  });