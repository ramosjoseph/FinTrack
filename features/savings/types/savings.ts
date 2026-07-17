export interface SavingsGoal {
  id: string;

  user_id: string;

  goal_name: string;

  target_amount: number;

  current_amount: number;

  monthly_contribution: number;

  deadline: string | null;

  completed: boolean;

  created_at: string;

  updated_at: string;
}