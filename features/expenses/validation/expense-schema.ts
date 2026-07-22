import { z } from "zod";

export const expenseSchema = z.object({
  expenseName: z
    .string()
    .min(2, "Expense name is required.")
    .max(100),

  categoryId: z
    .string()
    .uuid("Please select a category."),

  amount: z.coerce
    .number()
    .positive("Amount must be greater than zero."),

  expenseDate: z.string(),

  notes: z
    .string()
    .max(500)
    .optional()
    .or(z.literal("")),
});

export type ExpenseFormInput = z.input<typeof expenseSchema>;
export type ExpenseFormValues = z.output<typeof expenseSchema>;