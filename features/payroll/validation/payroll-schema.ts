import { z } from "zod";

export const payrollSchema = z.object({
  monthlySalary: z.coerce
    .number()
    .min(0, "Salary must be at least 0."),

  dailyBudget: z.coerce
    .number()
    .min(0, "Daily budget must be at least 0."),

  parentAllowance: z.coerce
    .number()
    .min(0, "Parent allowance must be at least 0."),

  cutoffDay1: z.coerce
    .number()
    .int()
    .min(1)
    .max(31),

  cutoffDay2: z.coerce
    .number()
    .int()
    .min(1)
    .max(31),

  payday1: z.coerce
    .number()
    .int()
    .min(1)
    .max(31),

  payday2: z.coerce
    .number()
    .int()
    .min(1)
    .max(31),

  workDaysPerWeek: z.coerce
    .number()
    .int()
    .min(1)
    .max(7),

  workHoursPerDay: z.coerce
    .number()
    .min(1)
    .max(24),

  employmentType: z.enum([
    "Regular",
    "Probationary",
    "Contractual",
    "Part-time",
    "Freelance",
  ]),
});

export type PayrollFormValues = z.infer<typeof payrollSchema>;