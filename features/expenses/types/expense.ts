export interface ExpenseCategory {
  id: string;
  name: string;
  icon: string | null;
  color: string | null;
}

export interface Expense {
  id: string;
  user_id: string;

  category_id: string;

  expense_name: string;

  amount: number;

  expense_date: string;

  notes: string | null;

  created_at: string;

  updated_at: string;

  expense_categories?: ExpenseCategory;
}