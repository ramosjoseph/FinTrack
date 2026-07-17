export interface PayrollSettings {
  id: string;
  user_id: string;

  monthly_salary: number;
  daily_budget: number;
  parent_allowance: number;

  cutoff_day_1: number;
  cutoff_day_2: number;

  payday_1: number;
  payday_2: number;

  work_days_per_week: number;
  work_hours_per_day: number;

  monthly_working_days: number;

  employment_type: string;

  created_at?: string;
  updated_at?: string;
}