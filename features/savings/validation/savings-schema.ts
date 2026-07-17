import { z } from "zod";

export const savingsSchema = z.object({
  goalName: z
    .string()
    .min(1, "Goal name is required."),

  targetAmount: z.coerce
    .number()
    .positive("Target amount must be greater than zero."),

  currentAmount: z.coerce
    .number()
    .min(0),

  monthlyContribution: z.coerce
    .number()
    .min(0),

  deadline: z.string().optional(),
});

export type SavingsFormValues =
  z.infer<typeof savingsSchema>;